import { BaseDataLoaderBuilderOptions } from 'src/common/graphql/dataloader/base-dataloader-options.type';
import { baseManyEntitiesDataLoaderBuilder } from 'src/common/graphql/dataloader/many-entities.dataloader';
import { baseSingleEntityDataLoaderBuilder } from 'src/common/graphql/dataloader/single-entity.dataloader';
import { IPortfolio } from 'src/portfolio/shared/portfolio.interface';

export const portfoliosLoader = (options: BaseDataLoaderBuilderOptions) =>
  baseManyEntitiesDataLoaderBuilder<IPortfolio>(options);

export const portfolioLoader = (options: BaseDataLoaderBuilderOptions) =>
  baseSingleEntityDataLoaderBuilder<IPortfolio>(options);
