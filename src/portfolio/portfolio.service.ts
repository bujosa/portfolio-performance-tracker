import { Injectable } from '@nestjs/common';
import { FilterInput } from 'src/common/graphql';
import { IPortfolio } from './shared/portfolio.interface';
import { PortfolioRepository } from './repository/repositories/portfolio.repository';
import { GetEntityByIdInput } from 'src/common/graphql/get-entity-by-id.input';
import {
  CreatePortfolioInput,
  CreatePortfolioWithAmountBasedInput,
  UpdatePortfolioInput,
} from './graphql/inputs';

@Injectable()
export class PortfolioService {
  constructor(private readonly repository: PortfolioRepository) {}

  public async getOneEntity(
    getOneEntityInput: Record<string, any>,
  ): Promise<IPortfolio> {
    return this.repository.getOneEntity(getOneEntityInput);
  }

  public async getEntities(filterInput: FilterInput): Promise<IPortfolio[]> {
    return this.repository.getAllEntities(filterInput);
  }

  public async createEntity(
    createPortfolioInput: CreatePortfolioInput,
  ): Promise<IPortfolio> {
    return this.repository.createEntity(createPortfolioInput);
  }

  public async createEntityWithAmountBased(
    createPortfolioWithAmountBasedInput: CreatePortfolioWithAmountBasedInput,
  ): Promise<IPortfolio> {
    return this.repository.createEntityWithAmountBased(
      createPortfolioWithAmountBasedInput,
    );
  }

  public async updateEntity(
    updateEntityInput: UpdatePortfolioInput,
  ): Promise<IPortfolio> {
    return this.repository.updateEntity(updateEntityInput);
  }

  public async deleteEntity(
    getOneEntityInput: GetEntityByIdInput,
  ): Promise<IPortfolio> {
    return this.repository.deleteEntity(getOneEntityInput);
  }
}
