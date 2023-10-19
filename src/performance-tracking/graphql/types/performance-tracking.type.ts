import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType({
  description:
    'PerformanceTracking object type, represents a set of assets owned by a user',
})
export class PerformanceTracking {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  slug: string;

  @Field()
  createdAt: string;
}
