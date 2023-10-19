import { ObjectType, Field, ID } from '@nestjs/graphql';
import { IAsset } from 'src/asset/shared/asset.interface';

@ObjectType({
  description:
    'An "asset" is a valuable resource or property owned by an individual or entity, which is expected to generate future benefits or income',
})
export class Asset implements IAsset {
  @Field(() => ID)
  id: string;

  @Field({ description: 'Name of the asset example: "Bitcoin"' })
  name: string;

  @Field({ description: 'Identifier of the asset example "bitcoin"' })
  slug: string;

  @Field({ description: 'Symbol of the asset example "BTC"' })
  symbol: string;

  @Field({ description: 'URL of the asset' })
  url: string;

  @Field()
  createdAt: string;
}
