import { Injectable } from '@nestjs/common';
import { ClientSession, Model, Error as MongooseErrors, Types } from 'mongoose';
import { generateISODate } from 'src/common/functions/generate-iso-date-string.util';
import { FilterInput } from 'src/common/graphql';
import { mongooseQueryBuilder } from 'src/common/graphql/mongo';
import {
  createEntityLog,
  getEntityByIdLog,
  getOneEntityLogMessageFormatter,
} from 'src/common/functions/log-message-builder';
import { updateEntities } from 'src/common/functions/update-entities';
import { InvalidUserInputError } from 'src/common/errors/invalid-user-input.error';
import { DuplicateKeyError } from 'src/common/errors/duplicate-key.error';
import { EntityNotFoundError } from 'src/common/errors/entity-not-found.error';
import { Portfolio } from '../entities';
import { InjectModel } from '@nestjs/mongoose';
import { transactionDefaultOptions } from 'src/common/mongo/transaction.options';
import { TransactionRepository } from 'src/transaction/repository/repositories/transaction.repository';
import { GetEntityByIdInput } from 'src/common/graphql/get-entity-by-id.input';
import {
  CreatePortfolioInput,
  CreatePortfolioWithAmountBasedInput,
  CreatePortfolioWithWeightBasedInput,
  TransactionByAmountBasedInput,
  UpdatePortfolioInput,
} from 'src/portfolio/graphql/inputs';
import { Transaction } from 'src/transaction/repository/entities';
import { ConfigService } from '@nestjs/config';
import { EnvKey } from 'src/common/data/config/env-key.enum';
import {
  TransactionAndHistoricalDataObjects,
  getTransactionsAndHistoricalDataObjects,
} from 'src/portfolio/shared';
import { CryptoMarketData } from 'src/crypto-market-data/repository/entities';
import { TransactionByWeightBasedInput } from 'src/portfolio/graphql/inputs/transaction-weight-based';

@Injectable()
export class PortfolioRepository {
  private readonly entityName = Portfolio.name;

  constructor(
    @InjectModel(Portfolio.name)
    readonly entityModel: Model<Portfolio>,
    @InjectModel(CryptoMarketData.name)
    readonly cryptoMarketDataModel: Model<CryptoMarketData>,
    @InjectModel(Transaction.name)
    readonly transactionModel: Model<Transaction>,
    readonly transactionRepository: TransactionRepository,
    readonly configService: ConfigService,
  ) {}

  private async _getOneEntity(
    getOneEntityInput: Record<string, any>,
    session?: ClientSession,
  ): Promise<Portfolio> {
    let query = this.entityModel.findOne(getOneEntityInput, null, { session });

    const entity = await query;

    if (!entity) {
      throw new EntityNotFoundError(this.entityName);
    }

    return entity;
  }

  public async getOneEntity(
    getOneEntityInput: Record<string, any>,
  ): Promise<Portfolio> {
    try {
      console.log(
        getOneEntityLogMessageFormatter(this.entityName, getOneEntityInput),
      );
      return this._getOneEntity(getOneEntityInput);
    } catch (error) {
      throw error;
    }
  }

  private async _getOneEntityById(
    _id: string,
    session?: ClientSession,
  ): Promise<Portfolio | null> {
    let query = this.entityModel.findById(_id, null, {
      session,
    });

    return query;
  }

  public async getOneEntityById(
    _id: string,
    session?: ClientSession,
  ): Promise<Portfolio> {
    try {
      console.log(getEntityByIdLog(this.entityName, _id));
      const entity = await this._getOneEntityById(_id, session);

      if (!entity) {
        throw new EntityNotFoundError(this.entityName);
      }

      return entity;
    } catch (error) {
      throw error;
    }
  }

  public async getOneEntityByIdOrNull(
    id: string,

    session?: ClientSession,
  ): Promise<Portfolio | null> {
    try {
      console.log(getEntityByIdLog(this.entityName, id));
      return this._getOneEntityById(id, session);
    } catch (error) {
      throw error;
    }
  }

  public async getAllEntities(filterInput: FilterInput): Promise<Portfolio[]> {
    try {
      let query = this.entityModel.find();

      const result: Portfolio[] = await mongooseQueryBuilder(
        query,
        filterInput,
      );

      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async createEntity(
    createEntityInput: CreatePortfolioInput,
    session?: ClientSession,
  ): Promise<Portfolio> {
    try {
      console.log(createEntityLog(this.entityName, createEntityInput));

      const result = new this.entityModel({
        ...createEntityInput,
        createdAt: generateISODate(),
        updatedAt: generateISODate(),
      });

      await result.save({ session });

      return this._getOneEntity({ id: result.id }, session);
    } catch (error) {
      if (error instanceof MongooseErrors.ValidationError) {
        throw InvalidUserInputError.fromMongooseValidationError(error);
      }

      if (error.code === 11000) {
        throw DuplicateKeyError.fromMongoDBDuplicateKeyError(error);
      }

      throw error;
    }
  }

  /**
   * @description Create a portfolio with amount based transactions
   * @param createEntityInput {@link CreatePortfolioWithAmountBasedInput}
   * @param session
   * @returns
   */
  public async createEntityWithAmountBased(
    createEntityInput: CreatePortfolioWithAmountBasedInput,
  ): Promise<Portfolio> {
    const session = await this.entityModel.startSession(
      transactionDefaultOptions,
    );

    const { name, transactions } = createEntityInput;

    try {
      console.log(createEntityLog(this.entityName, createEntityInput));

      const result = new this.entityModel({
        createdAt: generateISODate(),
        updatedAt: generateISODate(),
        name,
      });

      const transactionsAndHistoricalDataObjects =
        await this.getTransactionsAndHistoricalDataObjects(
          transactions,
          result._id,
        );

      await session.withTransaction(async () => {
        await result.save({ session });

        await Promise.all([
          this.cryptoMarketDataModel.insertMany(
            transactionsAndHistoricalDataObjects.historicalData,
            { session },
          ),
          this.transactionModel.insertMany(
            transactionsAndHistoricalDataObjects.transactions,
            { session },
          ),
        ]);
      });

      return result;
    } catch (error) {
      if (error instanceof MongooseErrors.ValidationError) {
        throw InvalidUserInputError.fromMongooseValidationError(error);
      }

      if (error.code === 11000) {
        throw DuplicateKeyError.fromMongoDBDuplicateKeyError(error);
      }

      throw error;
    } finally {
      await session.endSession();
    }
  }

  /**
   * @description Create a portfolio with weight based transactions
   * @param createEntityInput {@link CreatePortfolioWithWeightBasedInput}
   * @param session
   * @returns
   */
  public async createEntityWithWeightBased(
    createEntityInput: CreatePortfolioWithWeightBasedInput,
  ): Promise<Portfolio> {
    const session = await this.entityModel.startSession(
      transactionDefaultOptions,
    );

    const { name, transactions, budget } = createEntityInput;

    try {
      console.log(createEntityLog(this.entityName, createEntityInput));

      const result = new this.entityModel({
        createdAt: generateISODate(),
        updatedAt: generateISODate(),
        name,
      });

      const transactionsAndHistoricalDataObjects =
        await this.getTransactionsAndHistoricalDataObjects(
          transactions,
          result._id,
          budget,
        );

      await session.withTransaction(async () => {
        await result.save({ session });

        await Promise.all([
          this.cryptoMarketDataModel.insertMany(
            transactionsAndHistoricalDataObjects.historicalData,
            { session },
          ),
          this.transactionModel.insertMany(
            transactionsAndHistoricalDataObjects.transactions,
            { session },
          ),
        ]);
      });

      return result;
    } catch (error) {
      if (error instanceof MongooseErrors.ValidationError) {
        throw InvalidUserInputError.fromMongooseValidationError(error);
      }

      if (error.code === 11000) {
        throw DuplicateKeyError.fromMongoDBDuplicateKeyError(error);
      }

      throw error;
    } finally {
      await session.endSession();
    }
  }

  public async updateEntity(
    updateEntityInput: UpdatePortfolioInput,
    session?: ClientSession,
  ): Promise<Portfolio> {
    try {
      const { data, where } = updateEntityInput;

      let updateEntity = {};

      if (data) {
        updateEntity = updateEntities(data);
      }

      const result = await this._getOneEntity(where);

      result.set(updateEntity);

      await result.save({ session });

      return this._getOneEntity({ id: result.id }, session);
    } catch (error) {
      if (error instanceof MongooseErrors.ValidationError) {
        throw InvalidUserInputError.fromMongooseValidationError(error);
      }

      throw error;
    }
  }

  /**
   * @description Delete entity and all related transactions in a single transaction session
   * @param deleteEntityInput - This is the entity id to be deleted
   * @param session - This is a session for the transaction, if u wanna use an existing session
   * @returns Portfolio - This is the deleted entity
   */
  public async deleteEntity(
    deleteEntityInput: GetEntityByIdInput,
    session?: ClientSession,
  ): Promise<Portfolio> {
    if (session === undefined) {
      session = await this.entityModel.startSession(transactionDefaultOptions);
    }

    try {
      const result = await this._getOneEntity(deleteEntityInput);

      await session.withTransaction(async () => {
        await Promise.all([
          this.entityModel.deleteOne({ _id: result._id }, { session }),
          this.transactionRepository.deleteManyEntities(
            { portfolio: result._id },
            session,
          ),
        ]);
      });

      return result;
    } catch (error) {
      throw error;
    } finally {
      await session.endSession();
    }
  }

  public async aggregateEntities<Z = any>(pipeline: any[]): Promise<Z[]> {
    try {
      return await this.entityModel.aggregate(pipeline);
    } catch (error) {
      throw error;
    }
  }

  private async getTransactionsAndHistoricalDataObjects(
    transactions:
      | TransactionByAmountBasedInput[]
      | TransactionByWeightBasedInput[],
    portfolioId: Types.ObjectId,
    budget?: number,
  ): Promise<TransactionAndHistoricalDataObjects> {
    return getTransactionsAndHistoricalDataObjects(
      transactions,
      portfolioId,
      this.configService.get(EnvKey.COINMARKETCAP_API_KEY),
      budget,
    );
  }
}
