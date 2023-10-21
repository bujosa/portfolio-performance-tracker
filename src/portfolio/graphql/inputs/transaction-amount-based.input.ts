import { InputType, Field, Float } from '@nestjs/graphql';
import { ValidationInput } from 'src/common/validation';
import * as joi from 'joi';
import { CryptoAssetEnum } from 'src/performance-tracking/graphql/enums/crypto-asset.enum';
import { validatePositiveNumberWithJoi } from 'src/common/validation/number';

@InputType({
  description:
    'This input is used to specify a transaction by amount based example: 1 BTC, 2 ETH etc.',
})
export class TransactionByAmountBasedInput extends ValidationInput {
  @Field(() => CryptoAssetEnum, {
    description: 'Code of the asset. Example -> Bitcoin',
  })
  asset: CryptoAssetEnum;

  @Field(() => Float, { description: 'The quantity of the token, example 0.5' })
  amount: number;

  public static validationSchema = joi.object<TransactionByAmountBasedInput>({
    asset: joi
      .string()
      .valid(...Object.values(CryptoAssetEnum))
      .required(),
    amount: validatePositiveNumberWithJoi.required(),
  });
}
