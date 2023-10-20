import DataLoader from 'dataloader';
import { IAsset } from 'src/asset/shared/asset.interface';
import { ITransaction } from 'src/transaction/shared/transaction.interface';

export interface IGraphQLRequestContextLoaders {
  assetLoader: DataLoader<string, IAsset>;
  assetsLoader: DataLoader<string, IAsset[]>;
  transactionLoader: DataLoader<string, ITransaction>;
  transactionsLoader: DataLoader<string, ITransaction[]>;
}
