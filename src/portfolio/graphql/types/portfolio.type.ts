import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType({
  description:
    'Portfolio object type, represents a set of assets owned by a user',
})
export class Portfolio {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  slug: string;

  @Field()
  createdAt: string;
}
