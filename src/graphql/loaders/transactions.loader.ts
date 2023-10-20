import { BaseDataLoaderBuilderOptions } from 'src/common/graphql/dataloader/base-dataloader-options.type';
import { baseManyEntitiesDataLoaderBuilder } from 'src/common/graphql/dataloader/many-entities.dataloader';
import { baseSingleEntityDataLoaderBuilder } from 'src/common/graphql/dataloader/single-entity.dataloader';
import { ITransaction } from 'src/transaction/shared/transaction.interface';

export const transactionsLoader = (options: BaseDataLoaderBuilderOptions) =>
  baseManyEntitiesDataLoaderBuilder<ITransaction>(options);

export const transactionLoader = (options: BaseDataLoaderBuilderOptions) =>
  baseSingleEntityDataLoaderBuilder<ITransaction>(options);
