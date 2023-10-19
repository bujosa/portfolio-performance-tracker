import { Injectable } from '@nestjs/common';
import { FilterInput } from 'src/common/graphql';
import { CreatePortfolioInput } from './graphql/inputs/create-portfolio.input';
import { IPortfolio } from './shared/portfolio.interface';
import { PortfolioRepository } from './repository/repositories/portfolio.repository';
import { UpdatePortfolioInput } from './graphql/inputs/update-portfolio.input';
import { GetEntityByIdInput } from 'src/common/graphql/get-entity-by-id.input';

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
