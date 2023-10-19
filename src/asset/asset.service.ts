import { Injectable } from '@nestjs/common';
import { FilterInput } from 'src/common/graphql';
import { CreateAssetInput } from './graphql/inputs/create-asset.input';
import { IAsset } from './shared/asset.interface';
import { AssetRepository } from './repository/repositories/asset.repository';
import { UpdateAssetInput } from './graphql/inputs/update-asset.input';
import { getCoinPrice } from './shared/get_price';
import { ConfigService } from '@nestjs/config';
import { EnvKey } from 'src/common/data/config/env-key.enum';

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
    getOneEntityInput: Record<string, any>,
  ): Promise<IAsset> {
    return this.repository.deleteEntity(getOneEntityInput);
  }

  public async getPrice(asset: IAsset): Promise<number> {
    return getCoinPrice(
      asset.symbol,
      this.configService.get(EnvKey.COINMARKETCAP_API_KEY),
    );
  }
}
