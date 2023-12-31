import { Injectable } from '@nestjs/common';
import { FilterInput } from 'src/common/graphql';
import { CreateAssetInput } from './graphql/inputs/create-asset.input';
import { IAsset } from './shared/asset.interface';
import { AssetRepository } from './repository/repositories/asset.repository';
import { UpdateAssetInput } from './graphql/inputs/update-asset.input';
import { getTokenPrice } from './shared/get-token-price.function';
import { ConfigService } from '@nestjs/config';
import { EnvKey } from 'src/common/data/config/env-key.enum';
import { GetEntityByIdInput } from 'src/common/graphql/get-entity-by-id.input';

@Injectable()
export class AssetService {
  constructor(
    private readonly repository: AssetRepository,
    private readonly configService: ConfigService,
  ) {}

  public async getOneEntity(
    getOneEntityInput: Record<string, any>,
  ): Promise<IAsset> {
    return this.repository.getOneEntity(getOneEntityInput);
  }

  public async getEntities(filterInput: FilterInput): Promise<IAsset[]> {
    return this.repository.getAllEntities(filterInput);
  }

  public async createEntity(
    createAssetInput: CreateAssetInput,
  ): Promise<IAsset> {
    return this.repository.createEntity(createAssetInput);
  }

  public async updateEntity(
    updateEntityInput: UpdateAssetInput,
  ): Promise<IAsset> {
    return this.repository.updateEntity(updateEntityInput);
  }

  public async deleteEntity(
    getOneEntityInput: GetEntityByIdInput,
  ): Promise<IAsset> {
    return this.repository.deleteEntity(getOneEntityInput);
  }

  public async getPrice(asset: IAsset): Promise<number> {
    const coinMarketCap = await getTokenPrice(
      asset.symbol,
      this.configService.get(EnvKey.COINMARKETCAP_API_KEY),
    );

    return coinMarketCap.price;
  }
}
