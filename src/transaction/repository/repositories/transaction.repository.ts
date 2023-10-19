import { Injectable } from '@nestjs/common';
import { ClientSession, Model, Error as MongooseErrors } from 'mongoose';
import { generateISODate } from 'src/common/functions/generate-iso-date-string.util';
import { FilterInput } from 'src/common/graphql';
import {
  CreateTransactionInput,
  UpdateTransactionInput,
} from '../../graphql/inputs';
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
import { Transaction } from '../entities';
import { InjectModel } from '@nestjs/mongoose';
import { DeleteResult } from 'mongodb';
import { GetEntityByIdInput } from 'src/common/graphql/get-entity-by-id.input';

@Injectable()
export class TransactionRepository {
  private readonly entityName = Transaction.name;

  constructor(
    @InjectModel(Transaction.name)
    readonly entityModel: Model<Transaction>,
  ) {}

  private async _getOneEntity(
    getOneEntityInput: Record<string, any>,
    session?: ClientSession,
  ): Promise<Transaction> {
    let query = this.entityModel.findOne(getOneEntityInput, null, { session });

    const entity = await query;

    if (!entity) {
      throw new EntityNotFoundError(this.entityName);
    }

    return entity;
  }

  public async getOneEntity(
    getOneEntityInput: Record<string, any>,
  ): Promise<Transaction> {
    try {
      console.log(
        getOneEntityLogMessageFormatter(this.entityName, getOneEntityInput),
      );
      return this._getOneEntity(getOneEntityInput);
    } catch (error) {
      console.error(`${JSON.stringify(error)}`);
      throw error;
    }
  }

  private async _getOneEntityById(
    _id: string,
    session?: ClientSession,
  ): Promise<Transaction | null> {
    let query = this.entityModel.findById(_id, null, {
      session,
    });

    return query;
  }

  public async getOneEntityById(
    _id: string,
    session?: ClientSession,
  ): Promise<Transaction> {
    try {
      console.log(getEntityByIdLog(this.entityName, _id));
      const entity = await this._getOneEntityById(_id, session);

      if (!entity) {
        throw new EntityNotFoundError(this.entityName);
      }

      return entity;
    } catch (error) {
      console.error(`${JSON.stringify(error)}`);
      throw error;
    }
  }

  public async getOneEntityByIdOrNull(
    id: string,

    session?: ClientSession,
  ): Promise<Transaction | null> {
    try {
      console.log(getEntityByIdLog(this.entityName, id));
      return this._getOneEntityById(id, session);
    } catch (error) {
      console.error(`${JSON.stringify(error)}`);
      throw error;
    }
  }

  public async getAllEntities(
    filterInput: FilterInput,
  ): Promise<Transaction[]> {
    try {
      let query = this.entityModel.find();

      const result: Transaction[] = await mongooseQueryBuilder(
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
    createEntityInput: CreateTransactionInput,
    session?: ClientSession,
  ): Promise<Transaction> {
    try {
      console.log(createEntityLog(this.entityName, createEntityInput));

      const result = new this.entityModel({
        createdAt: generateISODate(),
        updatedAt: generateISODate(),
        ...createEntityInput,
      });

      await result.save({ session });

      return this._getOneEntity({ id: result.id }, session);
    } catch (error) {
      console.error(`${JSON.stringify(error)}`);

      if (error instanceof MongooseErrors.ValidationError) {
        throw InvalidUserInputError.fromMongooseValidationError(error);
      }

      if (error.code === 11000) {
        throw DuplicateKeyError.fromMongoDBDuplicateKeyError(error);
      }

      throw error;
    }
  }

  public async updateEntity(
    updateEntityInput: UpdateTransactionInput,
    session?: ClientSession,
  ): Promise<Transaction> {
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
      console.error(`${JSON.stringify(error)}`);

      if (error instanceof MongooseErrors.ValidationError) {
        throw InvalidUserInputError.fromMongooseValidationError(error);
      }

      throw error;
    }
  }

  public async deleteEntity(
    deleteEntityInput: GetEntityByIdInput,
    session?: ClientSession,
  ): Promise<Transaction> {
    try {
      const result = await this._getOneEntity(deleteEntityInput);

      await this.entityModel.deleteOne({ _id: result._id }, { session });

      return result;
    } catch (error) {
      console.error(`${JSON.stringify(error)}`);
      throw error;
    }
  }

  public async deleteManyEntities(
    deleteManyEntitiesInput: Record<string, any>,
    session?: ClientSession,
  ): Promise<DeleteResult> {
    try {
      const result = await this.entityModel.deleteMany(
        deleteManyEntitiesInput,
        { session },
      );

      return result;
    } catch (error) {
      console.error(`${JSON.stringify(error)}`);
      throw error;
    }
  }

  public async aggregateEntities<Z = any>(pipeline: any[]): Promise<Z[]> {
    try {
      return await this.entityModel.aggregate(pipeline);
    } catch (error) {
      console.error(`${JSON.stringify(error)}`);

      throw error;
    }
  }
}
