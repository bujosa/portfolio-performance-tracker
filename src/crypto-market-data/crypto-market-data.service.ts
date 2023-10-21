import { Injectable } from '@nestjs/common';
import { FilterInput } from 'src/common/graphql';
import { CreateCryptoMarketDataInput } from './graphql/inputs/create-crypto-market-data.input';
import { ICryptoMarketData } from './shared/crypto-market-data.interface';
import { CryptoMarketDataRepository } from './repository/repositories/crypto-market-data.repository';
import { UpdateCryptoMarketDataInput } from './graphql/inputs/update-crypto-market-data.input';
import { GetEntityByIdInput } from 'src/common/graphql/get-entity-by-id.input';

@Injectable()
export class CryptoMarketDataService {
  constructor(private readonly repository: CryptoMarketDataRepository) {}

  public async getOneEntity(
    getOneEntityInput: Record<string, any>,
  ): Promise<ICryptoMarketData> {
    return this.repository.getOneEntity(getOneEntityInput);
  }

  public async getEntities(
    filterInput: FilterInput,
  ): Promise<ICryptoMarketData[]> {
    return this.repository.getAllEntities(filterInput);
  }

  public async createEntity(
    createCryptoMarketDataInput: CreateCryptoMarketDataInput,
  ): Promise<ICryptoMarketData> {
    return this.repository.createEntity(createCryptoMarketDataInput);
  }

  public async updateEntity(
    updateEntityInput: UpdateCryptoMarketDataInput,
  ): Promise<ICryptoMarketData> {
    return this.repository.updateEntity(updateEntityInput);
  }

  public async deleteEntity(
    getOneEntityInput: GetEntityByIdInput,
  ): Promise<ICryptoMarketData> {
    return this.repository.deleteEntity(getOneEntityInput);
  }
}
