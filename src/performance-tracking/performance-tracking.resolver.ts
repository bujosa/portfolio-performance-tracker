import { Args, Query, Resolver } from '@nestjs/graphql';
import { CalculateBenchmarking } from './graphql/types/performance-tracking.type';
import { GraphQlFieldNames } from 'src/common/graphql';
import { PerformanceTrackingService } from './performance-tracking.service';
import { GetCryptoPortfolioBenchmarkingInput } from './graphql/inputs/get-crypto-portfolio-benchmarking.input';

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
}
