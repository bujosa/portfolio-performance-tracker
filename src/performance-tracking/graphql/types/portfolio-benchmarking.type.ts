import { ObjectType, Field, ID, Float } from '@nestjs/graphql';

@ObjectType({
  description:
    'Portfolio Benchmarking is a type that represents the benchmarking of a portfolio.',
})
export class PortfolioBenchmarking {
  @Field(() => ID)
  id: string;

  @Field(() => Float)
  totalSpent: number;

  @Field(() => Float)
  currentBudget: number;

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
