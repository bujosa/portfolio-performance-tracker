import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Portfolio } from 'src/portfolio/repository/entities';
import { GetCryptoPortfolioBenchmarkingInput } from 'src/performance-tracking/graphql';
import { Model } from 'mongoose';
import { IGroupTransactionsByAsset } from 'src/performance-tracking/shared';
import { ConfigService } from '@nestjs/config';
import { Transaction } from 'src/transaction/repository/entities';
import { CryptoMarketData } from 'src/crypto-market-data/repository/entities';
import { EntityNotFoundError } from 'src/common/errors/entity-not-found.error';
import { groupTransactionsByAssetPipeline } from '../pipelines/group-transactions-by-asset.pipeline';
import { EnvKey } from 'src/common/data/config/env-key.enum';
import {
  calculateBenchmarking,
  getPricesAndHistoricalData,
} from 'src/performance-tracking/shared/functions';
import { CalculateBenchmarking } from 'src/performance-tracking/graphql/types/performance-tracking.type';

@Injectable()
export class PerformanceTrackingRepository {
  constructor(
    @InjectModel(Portfolio.name)
    readonly portfolioModel: Model<Portfolio>,
    @InjectModel(Transaction.name)
    readonly transactionModel: Model<Transaction>,
    @InjectModel(CryptoMarketData.name)
    readonly cryptoMarketDataModel: Model<CryptoMarketData>,
    readonly configService: ConfigService,
  ) {}

  public async getCryptoPortfolioBenchmarking(
    getCryptoPortfolioBenchmarkingInput: GetCryptoPortfolioBenchmarkingInput,
  ): Promise<CalculateBenchmarking> {
    const { portfolio, asset } = getCryptoPortfolioBenchmarkingInput;

    // Check if portfolio exists
    const portfolioExists = await this.portfolioModel.exists({
      _id: portfolio,
    });

    if (!portfolioExists) {
      throw new EntityNotFoundError(Portfolio.name);
    }

    // Agroup transactions by asset
    const transactionsGroupByAsset =
      await this.aggregateEntities<IGroupTransactionsByAsset>(
        groupTransactionsByAssetPipeline({ portfolio }),
      );

    const assets: string[] = transactionsGroupByAsset.map(
      (transaction) => transaction.asset,
    );
    assets.push(asset);

    const pricesAndHistoicalDataObjects = await getPricesAndHistoricalData(
      assets,
      this.configService.get(EnvKey.COINMARKETCAP_API_KEY),
    );

    // Calculate the benchmarking of the portfolio and the asset
    const benchmarking = calculateBenchmarking(
      portfolioExists._id.toHexString(),
      transactionsGroupByAsset,
      asset,
      pricesAndHistoicalDataObjects,
    );

    // Note: This is a workaround for fetching the recent historical data. A better solution would be to fetch the historical data
    // in another service that would be called by the cron job frequently, but for this project, this is a good enough solution.
    // Insert the new historical data extracted from the API
    await this.cryptoMarketDataModel.insertMany(
      pricesAndHistoicalDataObjects.historicalData,
    );

    return benchmarking;
  }

  public async aggregateEntities<Z = any>(pipeline: any[]): Promise<Z[]> {
    try {
      return await this.transactionModel.aggregate(pipeline);
    } catch (error) {
      throw error;
    }
  }
}
