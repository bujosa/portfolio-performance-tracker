import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CryptoMarketData } from './graphql/types/crypto-market-data.type';
import { CreateCryptoMarketDataInput } from './graphql/inputs/create-crypto-market-data.input';
import {
  GraphQlFieldNames,
  graphQlIdArgOption,
  graphQlFindQueryOptions,
  FilterInput,
} from 'src/common/graphql';
import { CryptoMarketDataService } from './crypto-market-data.service';
import { UpdateCryptoMarketDataInput } from './graphql/inputs/update-crypto-market-data.input';

@Resolver(() => CryptoMarketData)
export class CryptoMarketDataResolver {
  constructor(private readonly service: CryptoMarketDataService) {}

  @Query(() => CryptoMarketData, {
    description: 'This query returns a crypto market data by id.',
  })
  public async getCryptoMarketDataById(
    @Args(GraphQlFieldNames.ID_FIELD, graphQlIdArgOption)
    id: string,
  ): Promise<CryptoMarketData> {
    return this.service.getOneEntity({ id });
  }

  @Query(() => [CryptoMarketData], {
    description: 'This query returns all crypto market datas.',
  })
  public async getCryptoMarketDatas(
    @Args(GraphQlFieldNames.INPUT_FIELD, graphQlFindQueryOptions)
    filterInput: FilterInput,
  ): Promise<CryptoMarketData[]> {
    return this.service.getEntities(filterInput);
  }

  @Mutation(() => CryptoMarketData)
  public async createCryptoMarketData(
    @Args(GraphQlFieldNames.INPUT_FIELD)
    createCryptoMarketDataInput: CreateCryptoMarketDataInput,
  ): Promise<CryptoMarketData> {
    return this.service.createEntity(createCryptoMarketDataInput);
  }

  @Mutation(() => CryptoMarketData)
  public async updateCryptoMarketData(
    @Args(GraphQlFieldNames.INPUT_FIELD)
    updateCryptoMarketDataInput: UpdateCryptoMarketDataInput,
  ): Promise<CryptoMarketData> {
    return this.service.updateEntity(updateCryptoMarketDataInput);
  }

  @Mutation(() => CryptoMarketData, {
    description: 'This mutation delete and specific crypto market data.',
  })
  public async deleteCryptoMarketData(
    @Args(GraphQlFieldNames.ID_FIELD, graphQlIdArgOption) id: string,
  ): Promise<CryptoMarketData> {
    return this.service.deleteEntity({ id });
  }
}
