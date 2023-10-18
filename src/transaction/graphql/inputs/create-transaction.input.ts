import { InputType, Field, ID, Float } from '@nestjs/graphql';
import { ValidationInput } from 'src/common/validation';
import { validatePositiveNumberWithJoi } from 'src/common/validation/number';
import {
  validateISODateWithJoi,
  validateNameWithJoi,
} from 'src/common/validation/strings';
import { validateMongoIdWithJoi } from 'src/common/validation/id/id.validator';
import * as joi from 'joi';

@InputType({ description: 'Create transaction input' })
export class CreateTransactionInput extends ValidationInput {
  @Field({ description: 'Code of the asset. Example -> BTC/ETH/ADA' })
  asset: string;

  @Field(() => Float, { description: 'Quantity of the asset. Example -> 1.5' })
  quantity: number;

  @Field()
  price?: number;

  @Field()
  date: string;

  @Field(() => ID)
  portfolio: string;

  public static validationSchema = joi.object<CreateTransactionInput>({
    asset: validateNameWithJoi.required(),
    quantity: validatePositiveNumberWithJoi.required(),
    price: validatePositiveNumberWithJoi,
    date: validateISODateWithJoi('date').required(),
    portfolio: validateMongoIdWithJoi('portfolio').required(),
  });
}
