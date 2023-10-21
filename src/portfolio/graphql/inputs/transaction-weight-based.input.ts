import { InputType, Field, Float } from '@nestjs/graphql';
import { ValidationInput } from 'src/common/validation';
import { CryptoAssetEnum } from 'src/performance-tracking/graphql/enums/crypto-asset.enum';
import * as joi from 'joi';

@InputType({
  description:
    'This input is used to specify a transaction by amount based example: 1 BTC, 2 ETH etc.',
})
export class TransactionByWeightBasedInput extends ValidationInput {
  @Field(() => CryptoAssetEnum, {
    description: 'Code of the asset. Example -> Bitcoin',
  })
  asset: CryptoAssetEnum;

  @Field(() => Float, {
    description:
      'The weight of the token, example 50 represents 50% of this transaction',
  })
  weight: number;

  public static validationSchema = joi.object<TransactionByWeightBasedInput>({
    asset: joi
      .string()
      .valid(...Object.values(CryptoAssetEnum))
      .required(),
    weight: joi.number().required().min(0).max(100),
  });
}
