import { ObjectType, Field } from '@nestjs/graphql';
import { ICalculateBenchmarking } from 'src/performance-tracking/shared/interfaces/benchmarking.interface';
import { PortfolioBenchmarking } from './portfolio-benchmarking.type';
import { AssetBenchmarking } from './asset-benchmarking.type';

@ObjectType({
  description:
    'Calculate Benchmarking is a type that represents the calculate benchmarking agains the portfolio and the assets.',
})
export class CalculateBenchmarking implements ICalculateBenchmarking {
  @Field(() => PortfolioBenchmarking)
  portfolio: PortfolioBenchmarking;

  @Field(() => AssetBenchmarking)
  asset: AssetBenchmarking;
}
