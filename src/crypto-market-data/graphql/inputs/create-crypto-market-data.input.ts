import { InputType, Field, Float } from '@nestjs/graphql';
import { ValidationInput } from 'src/common/validation';
import { validateNameWithJoi } from 'src/common/validation/strings/name/name.validator';
import * as joi from 'joi';
import { validateISODateWithJoi } from 'src/common/validation/strings';

@InputType()
export class CreateCryptoMarketDataInput extends ValidationInput {
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
  timestamp: string;

  @Field({
    description:
      'Date of the crypto currency when this data was taken, example 2021-01-01',
  })
  date: string;

  public static validationSchema = joi.object<CreateCryptoMarketDataInput>({
    cryptoName: validateNameWithJoi.required(),
    open: joi.number().required(),
    high: joi.number().required(),
    low: joi.number().required(),
    close: joi.number().required(),
    marketCap: joi.number().required(),
    timestamp: validateISODateWithJoi('timeStamp').required(),
    date: validateISODateWithJoi('date').required(),
  });
}
