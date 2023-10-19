import { Injectable } from '@nestjs/common';
import { FilterInput } from 'src/common/graphql';
import { CreateTransactionInput } from './graphql/inputs/create-transaction.input';
import { ITransaction } from './shared/transaction.interface';
import { TransactionRepository } from './repository/repositories/transaction.repository';
import { UpdateTransactionInput } from './graphql/inputs/update-transaction.input';
import { GetEntityByIdInput } from 'src/common/graphql/get-entity-by-id.input';

@Injectable()
export class TransactionService {
  constructor(private readonly repository: TransactionRepository) {}

  public async getOneEntity(
    getOneEntityInput: Record<string, any>,
  ): Promise<ITransaction> {
    return this.repository.getOneEntity(getOneEntityInput);
  }

  public async getEntities(filterInput: FilterInput): Promise<ITransaction[]> {
    return this.repository.getAllEntities(filterInput);
  }

  public async createEntity(
    createTransactionInput: CreateTransactionInput,
  ): Promise<ITransaction> {
    return this.repository.createEntity(createTransactionInput);
  }

  public async updateEntity(
    updateEntityInput: UpdateTransactionInput,
  ): Promise<ITransaction> {
    return this.repository.updateEntity(updateEntityInput);
  }

  public async deleteEntity(
    getOneEntityInput: GetEntityByIdInput,
  ): Promise<ITransaction> {
    return this.repository.deleteEntity(getOneEntityInput);
  }
}
