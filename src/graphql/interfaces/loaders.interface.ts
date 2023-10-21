import DataLoader from 'dataloader';
import { IAsset } from 'src/asset/shared/asset.interface';
import { IPortfolio } from 'src/portfolio/shared/portfolio.interface';
import { ITransaction } from 'src/transaction/shared/transaction.interface';

export interface IGraphQLRequestContextLoaders {
  assetLoader: DataLoader<string, IAsset>;
  portfolioLoader: DataLoader<string, IPortfolio>;
  transactionLoader: DataLoader<string, ITransaction>;
  transactionsLoader: DataLoader<string, ITransaction[]>;
}
