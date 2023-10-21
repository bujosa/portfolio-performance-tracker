import { ObjectType, Field, Float } from '@nestjs/graphql';

@ObjectType({
  description:
    'Asset Benchmarking is a type that represents the benchmarking of an asset.',
})
export class AssetBenchmarking {
  @Field()
  name: string;

  @Field(() => Float)
  currentPrice: number;

  @Field(() => Float)
  changeOneHour: number;

  @Field(() => Float)
  changeOneDay: number;

  @Field(() => Float)
  changeOneWeek: number;

  @Field(() => Float)
  changeOneMonth: number;

  @Field(() => Float)
  changeTwoMonths: number;

  @Field(() => Float)
  changeThreeMonths: number;
}
