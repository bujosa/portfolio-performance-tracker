import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Transaction } from './graphql/types/transaction.type';
import {
  CreateTransactionInput,
  UpdateTransactionInput,
} from './graphql/inputs';
import {
  GraphQlFieldNames,
  graphQlIdArgOption,
  graphQlFindQueryOptions,
  FilterInput,
} from 'src/common/graphql';
import { TransactionService } from './transaction.service';

@Resolver(() => Transaction)
export class TransactionResolver {
  constructor(private readonly service: TransactionService) {}

  @Query(() => Transaction, {
    description: 'This query returns a transaction by id.',
  })
  public async getTransactionById(
    @Args(GraphQlFieldNames.ID_FIELD, graphQlIdArgOption)
    id: string,
  ): Promise<Transaction> {
    return this.service.getOneEntity({ id });
  }

  @Query(() => [Transaction], {
    description: 'This query returns all transactions.',
  })
  public async getTransactions(
    @Args(GraphQlFieldNames.INPUT_FIELD, graphQlFindQueryOptions)
    filterInput: FilterInput,
  ): Promise<Transaction[]> {
    return this.service.getEntities(filterInput);
  }

  @Mutation(() => Transaction)
  public async createTransaction(
    @Args(GraphQlFieldNames.INPUT_FIELD)
    createTransactionInput: CreateTransactionInput,
  ): Promise<Transaction> {
    return this.service.createEntity(createTransactionInput);
  }

  @Mutation(() => Transaction)
  public async updateTransaction(
    @Args(GraphQlFieldNames.INPUT_FIELD)
    updateTransactionInput: UpdateTransactionInput,
  ): Promise<Transaction> {
    return this.service.updateEntity(updateTransactionInput);
  }

  @Mutation(() => Transaction)
  public async deleteTransaction(
    @Args(GraphQlFieldNames.ID_FIELD, graphQlIdArgOption) id: string,
  ): Promise<Transaction> {
    return this.service.deleteEntity({ id });
  }
}
