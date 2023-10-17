import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Portfolio } from './graphql/types/portfolio.type';
import { CreatePortfolioInput } from './graphql/inputs/create-portfolio.input';
import {
  GraphQlFieldNames,
  graphQlIdArgOption,
  graphQlFindQueryOptions,
  FilterInput,
} from 'src/common/graphql';
import { PortfolioService } from './portfolio.service';
import { UpdatePortfolioInput } from './graphql/inputs/update-portfolio.input';

@Resolver(() => Portfolio)
export class PortfolioResolver {
  constructor(private readonly service: PortfolioService) {}

  @Query(() => Portfolio, {
    description: 'This query returns a portfolio by id.',
  })
  public async getPortfolioById(
    @Args(GraphQlFieldNames.ID_FIELD, graphQlIdArgOption)
    id: string,
  ): Promise<Portfolio> {
    return this.service.getOneEntity({ id });
  }

  @Query(() => [Portfolio], {
    description: 'This query returns all portfolios.',
  })
  public async getPortfolios(
    @Args(GraphQlFieldNames.INPUT_FIELD, graphQlFindQueryOptions)
    filterInput: FilterInput,
  ): Promise<Portfolio[]> {
    return this.service.getEntities(filterInput);
  }

  @Mutation(() => Portfolio)
  public async createPortfolio(
    @Args(GraphQlFieldNames.INPUT_FIELD)
    createPortfolioInput: CreatePortfolioInput,
  ): Promise<Portfolio> {
    return this.service.createEntity(createPortfolioInput);
  }

  @Mutation(() => Portfolio)
  public async updatePortfolio(
    @Args(GraphQlFieldNames.INPUT_FIELD)
    updatePortfolioInput: UpdatePortfolioInput,
  ): Promise<Portfolio> {
    return this.service.updateEntity(updatePortfolioInput);
  }

  @Mutation(() => Portfolio)
  public async deletePortfolio(
    @Args(GraphQlFieldNames.ID_FIELD, graphQlIdArgOption) id: string,
  ): Promise<Portfolio> {
    return this.service.deleteEntity({ id });
  }
}
