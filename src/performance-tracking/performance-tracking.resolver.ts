import {
  Args,
  Context,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CalculateBenchmarking } from './graphql/types/performance-tracking.type';
import { GraphQlFieldNames } from 'src/common/graphql';
import { PerformanceTrackingService } from './performance-tracking.service';
import { GetCryptoPortfolioBenchmarkingInput } from './graphql/inputs/get-crypto-portfolio-benchmarking.input';
import { Portfolio } from 'src/portfolio/graphql/types/portfolio.type';
import { GraphQLRequestContext } from 'src/graphql';

@Resolver(() => CalculateBenchmarking)
export class PerformanceTrackingResolver {
  constructor(private readonly service: PerformanceTrackingService) {}

  @Query(() => CalculateBenchmarking, {
    description:
      'Getting a relative portfolio benchmarking against a cryptocurrency, for example, benchmarking a portfolioZ against Bitcoin',
  })
  public async getCryptoPortfolioBenchmarking(
    @Args(GraphQlFieldNames.INPUT_FIELD)
    getCryptoPortfolioBenchmarkingInput: GetCryptoPortfolioBenchmarkingInput,
  ): Promise<CalculateBenchmarking> {
    return this.service.getCryptoPortfolioBenchmarking(
      getCryptoPortfolioBenchmarkingInput,
    );
  }

  // Resolver fields
  @ResolveField(() => Portfolio)
  public async portfolioData(
    @Parent() parent: CalculateBenchmarking,
    @Context() ctx: GraphQLRequestContext,
  ) {
    return ctx.loaders.portfolioLoader.load(parent.portfolio.id);
  }
}
