import { InputType, Field, ID, Float } from '@nestjs/graphql';
import { ValidationInput } from 'src/common/validation';
import { validatePositiveNumberWithJoi } from 'src/common/validation/number';
import {
  validateISODateWithJoi,
  validateNameWithJoi,
} from 'src/common/validation/strings';
import { validateMongoIdWithJoi } from 'src/common/validation/id/id.validator';
import * as joi from 'joi';
import { CryptoAssetEnum } from 'src/performance-tracking/graphql/enums/crypto-asset.enum';

@InputType({ description: 'Create transaction input' })
export class CreateTransactionInput extends ValidationInput {
  @Field(() => CryptoAssetEnum, {
    description: 'Code of the asset. Example -> Bitcoin',
  })
  asset: CryptoAssetEnum;

  @Field(() => Float, { description: 'Quantity of the asset. Example -> 0.25' })
  quantity: number;

  @Field(() => Float, {
    nullable: true,
    description:
      'Price of the asset in the moment that you bought the crypto currency. Example -> 63987.24',
  })
  price?: number;

  @Field({
    description:
      'Date of the you bought the asset. Example -> 2021-10-19 or 2021-10-19T01:00:00.999Z',
  })
  date: string;

  @Field(() => ID)
  portfolio: string;

  public static validationSchema = joi.object<CreateTransactionInput>({
    asset: joi
      .string()
      .valid(...Object.values(CryptoAssetEnum))
      .required(),
    quantity: validatePositiveNumberWithJoi.required(),
    price: validatePositiveNumberWithJoi,
    date: validateISODateWithJoi('date').required(),
    portfolio: validateMongoIdWithJoi('portfolio').required(),
  });
}
