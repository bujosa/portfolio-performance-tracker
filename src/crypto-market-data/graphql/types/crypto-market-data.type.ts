import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { ICryptoMarketData } from 'src/crypto-market-data/shared/crypto-market-data.interface';

@ObjectType({
  description:
    'CryptoMarketData object type, represent a data from a crypto currency market. ',
})
export class CryptoMarketData implements ICryptoMarketData {
  @Field(() => ID)
  id: string;

  @Field({ description: 'Name of the crypto currency example: Bitcoin' })
  cryptoName: string;

  @Field(() => Float, {
    description:
      'Open price of the crypto currency in that date, example 1.0  ',
  })
  open: number;

  @Field(() => Float, {
    description: 'High price of the crypto currency in that date, example 2.5 ',
  })
  high: number;

  @Field(() => Float, {
    description: 'Low price of the crypto currency in that date, example 0.5 ',
  })
  low: number;

  @Field(() => Float, {
    description:
      'Close price of the crypto currency in that date, example 1.5 ',
  })
  close: number;

  @Field(() => Float, {
    description: 'Market cap of the crypto currency in that date ',
  })
  marketCap: number;

  @Field({
    description:
      'Timestamp of the crypto currency when this data was taken, example 2021-01-01T00:00:00.000Z',
  })
  timeStamp: string;

  @Field({
    description:
      'Date of the crypto currency when this data was taken, example 2021-01-01',
  })
  date: string;

  @Field()
  createdAt: string;
}
