import { Injectable } from '@nestjs/common';
import { FilterInput } from 'src/common/graphql';
import { IPerformanceTracking } from './shared/performance-tracking.interface';
import { PerformanceTrackingRepository } from './repository/repositories';
import { GetCryptoPortfolioBenchmarkingInput } from './graphql/inputs/get-crypto-portfolio-benchmarking.input';

@Injectable()
export class PerformanceTrackingService {
  constructor(private readonly repository: PerformanceTrackingRepository) {}

  public async getCryptoPortfolioBenchmarking(
    getCryptoPortfolioBenchmarkingInput: GetCryptoPortfolioBenchmarkingInput,
  ): Promise<IPerformanceTracking> {
    return null;
  }

  public async getEntities(
    filterInput: FilterInput,
  ): Promise<IPerformanceTracking[]> {
    return null;
  }
}
