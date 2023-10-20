import { IAsset } from 'src/asset/shared/asset.interface';
import { BaseDataLoaderBuilderOptions } from 'src/common/graphql/dataloader/base-dataloader-options.type';
import { baseManyEntitiesDataLoaderBuilder } from 'src/common/graphql/dataloader/many-entities.dataloader';
import { baseSingleEntityDataLoaderBuilder } from 'src/common/graphql/dataloader/single-entity.dataloader';

export const assetsLoader = (options: BaseDataLoaderBuilderOptions) =>
  baseManyEntitiesDataLoaderBuilder<IAsset>(options);

export const assetLoader = (options: BaseDataLoaderBuilderOptions) =>
  baseSingleEntityDataLoaderBuilder<IAsset>(options);
