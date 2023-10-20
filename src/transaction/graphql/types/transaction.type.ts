import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { ITransaction } from 'src/transaction/shared/transaction.interface';

@ObjectType({
  description: 'Transaction type, represents a transaction in the portfolio.',
})
export class Transaction implements ITransaction {
  @Field(() => ID)
  id: string;

  @Field(() => Float, { description: 'Quantity of the asset.' })
  quantity: number;

  @Field(() => Float, { description: 'Price of the asset.' })
  price?: number;

  @Field({ description: 'Date of the transaction.' })
  date: string;

  @Field({ description: 'Creation date of the transaction.' })
  createdAt: string;

  @Field({ description: 'Represent the name of asset' })
  asset: string;

  portfolio: string;
}
