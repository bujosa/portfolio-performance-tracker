import {
  Args,
  Float,
  Mutation,
  Query,
  Resolver,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { Asset } from './graphql/types/asset.type';
import { CreateAssetInput, UpdateAssetInput } from './graphql/inputs';
import {
  GraphQlFieldNames,
  graphQlIdArgOption,
  graphQlFindQueryOptions,
  FilterInput,
} from 'src/common/graphql';
import { AssetService } from './asset.service';

@Resolver(() => Asset)
export class AssetResolver {
  constructor(private readonly service: AssetService) {}

  @Query(() => Asset, {
    description: 'This query returns an asset by id.',
  })
  public async getAssetById(
    @Args(GraphQlFieldNames.ID_FIELD, graphQlIdArgOption)
    id: string,
  ): Promise<Asset> {
    return this.service.getOneEntity({ id });
  }

  @Query(() => [Asset], {
    description: 'This query returns all assets.',
  })
  public async getAssets(
    @Args(GraphQlFieldNames.INPUT_FIELD, graphQlFindQueryOptions)
    filterInput: FilterInput,
  ): Promise<Asset[]> {
    return this.service.getEntities(filterInput);
  }

  @Mutation(() => Asset, { description: 'This mutation creates an asset' })
  public async createAsset(
    @Args(GraphQlFieldNames.INPUT_FIELD)
    createAssetInput: CreateAssetInput,
  ): Promise<Asset> {
    return this.service.createEntity(createAssetInput);
  }

  @Mutation(() => Asset)
  public async updateAsset(
    @Args(GraphQlFieldNames.INPUT_FIELD)
    updateAssetInput: UpdateAssetInput,
  ): Promise<Asset> {
    return this.service.updateEntity(updateAssetInput);
  }

  @Mutation(() => Asset)
  public async deleteAsset(
    @Args(GraphQlFieldNames.ID_FIELD, graphQlIdArgOption) id: string,
  ): Promise<Asset> {
    return this.service.deleteEntity({ id });
  }

  @ResolveField(() => Float)
  public async price(@Parent() asset: Asset): Promise<number> {
    return this.service.getPrice(asset);
  }
}
