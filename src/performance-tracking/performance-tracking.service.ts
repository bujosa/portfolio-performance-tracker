import { Injectable } from '@nestjs/common';
import { PerformanceTrackingRepository } from './repository/repositories';
import { GetCryptoPortfolioBenchmarkingInput } from './graphql/inputs/get-crypto-portfolio-benchmarking.input';
import { CalculateBenchmarking } from './graphql/types/performance-tracking.type';

@Injectable()
export class PerformanceTrackingService {
  constructor(private readonly repository: PerformanceTrackingRepository) {}

  public async getCryptoPortfolioBenchmarking(
    getCryptoPortfolioBenchmarkingInput: GetCryptoPortfolioBenchmarkingInput,
  ): Promise<CalculateBenchmarking> {
    return this.repository.getCryptoPortfolioBenchmarking(
      getCryptoPortfolioBenchmarkingInput,
    );
  }
}
