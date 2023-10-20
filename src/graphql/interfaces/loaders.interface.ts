import DataLoader from 'dataloader';
import { ITransaction } from 'src/transaction/shared/transaction.interface';

export interface IGraphQLRequestContextLoaders {
  transactionLoader: DataLoader<string, ITransaction>;
  transactionsLoader: DataLoader<string, ITransaction[]>;
}
