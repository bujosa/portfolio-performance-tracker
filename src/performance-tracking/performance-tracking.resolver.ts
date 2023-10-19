import { Args, Query, Resolver } from '@nestjs/graphql';
import { PerformanceTracking } from './graphql/types/performance-tracking.type';
import {
  GraphQlFieldNames,
  graphQlIdArgOption,
  graphQlFindQueryOptions,
  FilterInput,
} from 'src/common/graphql';
import { PerformanceTrackingService } from './performance-tracking.service';
import { GetCryptoPortfolioBenchmarkingInput } from './graphql/inputs/get-crypto-portfolio-benchmarking.input';

@Resolver(() => PerformanceTracking)
export class PerformanceTrackingResolver {
  constructor(private readonly service: PerformanceTrackingService) {}

  @Query(() => PerformanceTracking, {
    description:
      'Getting a relative portfolio benchmarking against a cryptocurrency, for example, benchmarking a portfolioZ against Bitcoin',
  })
  public async getCryptoPortfolioBenchmarking(
    @Args(GraphQlFieldNames.INPUT_FIELD)
    getCryptoPortfolioBenchmarkingInput: GetCryptoPortfolioBenchmarkingInput,
  ): Promise<PerformanceTracking> {
    return this.service.getCryptoPortfolioBenchmarking(
      getCryptoPortfolioBenchmarkingInput,
    );
  }

  @Query(() => [PerformanceTracking], {
    description: 'This query returns all portfolios.',
  })
  public async getPerformanceTrackings(
    @Args(GraphQlFieldNames.INPUT_FIELD, graphQlFindQueryOptions)
    filterInput: FilterInput,
  ): Promise<PerformanceTracking[]> {
    return this.service.getEntities(filterInput);
  }
}
