import { Types } from 'mongoose';
import { TransactionByAmountBasedInput } from '../graphql/inputs';
import {
  CoinMarketCapQuoteUSDWithName,
  getTokensPrices,
} from 'src/asset/shared/get-tokens-prices.function';
import { generateISODate } from 'src/common/functions/generate-iso-date-string.util';
import { TransactionByWeightBasedInput } from '../graphql/inputs/transaction-weight-based';

/**
 * @description Extracts prices for the market data of the tokens in the
 * transactions and creates the transactions and historical data objects
 * @param transactions {@link TransactionByAmountBasedInput} | {@link TransactionByWeightBasedInput}
 * @param portfolioId {@link Types.ObjectId}
 * @param apiKey string
 * @param budget number | undefined
 */
export async function getTransactionsAndHistoricalDataObjects(
  transactions:
    | TransactionByAmountBasedInput[]
    | TransactionByWeightBasedInput[],
  portfolioId: Types.ObjectId,
  apiKey: string,
  budget?: number,
): Promise<TransactionAndHistoricalDataObjects> {
  const names = transactions.map((transaction) => transaction.asset);
  const tokensPriceData = await getTokensPrices(names, apiKey);

  const transactionsMongooseObject: TransactionMongooseObject[] = [];
  let historicalMarketDataObject: HistoricalDataMongooseObject[] = [];

  for (const transaction of transactions) {
    const tokenPrice = tokensPriceData.find(
      (tokenPrice) => tokenPrice.name === transaction.asset,
    );

    const _idTransaction = new Types.ObjectId();

    let quantity = 0;

    if (transaction instanceof TransactionByAmountBasedInput) {
      quantity = transaction.amount;
    } else {
      let budgetPerTransaction = budget * (transaction.weight / 100);
      quantity = budgetPerTransaction / tokenPrice.price;
    }

    if (tokenPrice) {
      transactionsMongooseObject.push({
        _id: _idTransaction,
        id: _idTransaction.toHexString(),
        portfolio: portfolioId,
        asset: transaction.asset,
        quantity,
        price: tokenPrice.price,
        date: tokenPrice.last_updated,
        version: 0,
        createdAt: generateISODate(),
        updatedAt: generateISODate(),
      });
    } else {
      console.error(`Token price not found for ${transaction.asset}`);
    }

    const historicalMarketDatas = createMultipleHistoricalData(tokenPrice);

    historicalMarketDataObject = historicalMarketDataObject.concat(
      historicalMarketDatas,
    );
  }

  return new TransactionAndHistoricalDataObjects(
    transactionsMongooseObject,
    historicalMarketDataObject,
  );
}

function createMultipleHistoricalData(
  tokenPrice: CoinMarketCapQuoteUSDWithName,
): HistoricalDataMongooseObject[] {
  const result = [];
  const price = tokenPrice.price;
  const percent_change_1h = tokenPrice.percent_change_1h;
  const percentChange24h = tokenPrice.percent_change_24h;
  const percentChange7d = tokenPrice.percent_change_7d;
  const percentChange30d = tokenPrice.percent_change_30d;
  const percentChange60d = tokenPrice.percent_change_60d;
  const percentChange90d = tokenPrice.percent_change_90d;
  const marketCap = tokenPrice.market_cap;
  const updatedAt = tokenPrice.last_updated;
  const name = tokenPrice.name;
  const timestamp = new Date(updatedAt).getTime();
  const percentAndDate = [];

  percentAndDate.push({
    percent: percent_change_1h,
    date: new Date(timestamp - 3600 * 1000).toISOString(),
  });
  percentAndDate.push({
    percent: percentChange24h,
    date: new Date(timestamp - 24 * 3600 * 1000).toISOString(),
  });
  percentAndDate.push({
    percent: percentChange7d,
    date: new Date(timestamp - 7 * 24 * 3600 * 1000).toISOString(),
  });
  percentAndDate.push({
    percent: percentChange30d,
    date: new Date(timestamp - 30 * 24 * 3600 * 1000).toISOString(),
  });
  percentAndDate.push({
    percent: percentChange60d,
    date: new Date(timestamp - 60 * 24 * 3600 * 1000).toISOString(),
  });
  percentAndDate.push({
    percent: percentChange90d,
    date: new Date(timestamp - 90 * 24 * 3600 * 1000).toISOString(),
  });

  for (const percentAndDateItem of percentAndDate) {
    const calculatePrice =
      -1 * (price * ((100 + percentAndDateItem.percent) / 100) - price) + price;
    const calculateMarketCap =
      -1 *
        (marketCap * ((100 + percentAndDateItem.percent) / 100) - marketCap) +
      marketCap;

    const _id = new Types.ObjectId();
    result.push({
      _id,
      id: _id.toHexString(),
      open: calculatePrice,
      high: calculatePrice,
      low: calculatePrice,
      close: calculatePrice,
      marketCap: calculateMarketCap,
      timestamp: percentAndDateItem.date,
      cryptoName: name,
      date: percentAndDateItem.date.split('T')[0],
      version: 0,
      createdAt: generateISODate(),
      updatedAt: generateISODate(),
    });
  }

  return result;
}

export class TransactionAndHistoricalDataObjects {
  transactions: TransactionMongooseObject[];
  historicalData: HistoricalDataMongooseObject[];

  constructor(
    public readonly _transactions: TransactionMongooseObject[],
    public readonly _historicalData: HistoricalDataMongooseObject[],
  ) {
    this.transactions = _transactions;
    this.historicalData = _historicalData;
  }
}

type TransactionMongooseObject = {
  _id: Types.ObjectId;
  id: string;
  portfolio: Types.ObjectId;
  asset: string;
  date: string;
  quantity: number;
  price: number;
  version: number;
  createdAt: string;
  updatedAt: string;
};

type HistoricalDataMongooseObject = {
  _id: Types.ObjectId;
  id: string;
  open: number;
  high: number;
  low: number;
  close: number;
  marketCap: number;
  timestamp: string;
  cryptoName: string;
  date: string;
  version: number;
  createdAt: string;
  updatedAt: string;
};
