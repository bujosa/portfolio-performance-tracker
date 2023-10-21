import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Portfolio } from './graphql/types/portfolio.type';
import {
  GraphQlFieldNames,
  graphQlIdArgOption,
  graphQlFindQueryOptions,
  FilterInput,
} from 'src/common/graphql';
import { PortfolioService } from './portfolio.service';
import { Transaction } from 'src/transaction/graphql/types/transaction.type';
import { GraphQLRequestContext } from 'src/graphql';
import { ValidateObjectIdPipe } from 'src/common/pipes/joi-id-validation.pipe';
import {
  CreatePortfolioInput,
  CreatePortfolioWithAmountBasedInput,
  CreatePortfolioWithWeightBasedInput,
  UpdatePortfolioInput,
} from './graphql/inputs';

@Resolver(() => Portfolio)
export class PortfolioResolver {
  constructor(private readonly service: PortfolioService) {}

  @Query(() => Portfolio, {
    description: 'This query returns a portfolio by id.',
  })
  public async getPortfolioById(
    @Args(GraphQlFieldNames.ID_FIELD, graphQlIdArgOption, ValidateObjectIdPipe)
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

  @Mutation(() => Portfolio, {
    description: 'This mutation creates a portfolio with the given input.',
  })
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

  @Mutation(() => Portfolio, {
    description:
      'This mutation deletes a portfolio by id and ALL its transactions related with that portfolio',
  })
  public async deletePortfolio(
    @Args(GraphQlFieldNames.ID_FIELD, graphQlIdArgOption, ValidateObjectIdPipe)
    id: string,
  ): Promise<Portfolio> {
    return this.service.deleteEntity({ id });
  }

  // Business logic
  @Mutation(() => Portfolio, {
    description:
      'This mutation creates a portfolio with a initial transactions based in amount.',
  })
  public async createPortfolioWithAmountBased(
    @Args(GraphQlFieldNames.INPUT_FIELD)
    createPortfolioWithAmountBasedInput: CreatePortfolioWithAmountBasedInput,
  ): Promise<Portfolio> {
    return this.service.createEntityWithAmountBased(
      createPortfolioWithAmountBasedInput,
    );
  }

  @Mutation(() => Portfolio, {
    description:
      'This mutation creates a portfolio with a initial transactions based in weight and budget.',
  })
  public async createPortfolioWithWeightBased(
    @Args(GraphQlFieldNames.INPUT_FIELD)
    createPortfolioWithAmountBasedInput: CreatePortfolioWithWeightBasedInput,
  ): Promise<Portfolio> {
    return this.service.createEntityWithWeightBased(
      createPortfolioWithAmountBasedInput,
    );
  }

  // Resolver fields
  @ResolveField(() => [Transaction])
  public async transactions(
    @Parent() parent: Portfolio,
    @Context() ctx: GraphQLRequestContext,
  ) {
    return ctx.loaders.transactionsLoader.load(parent.id);
  }
}
