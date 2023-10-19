import { InputType, Field, ID } from '@nestjs/graphql';
import { ValidationInput } from 'src/common/validation';
import { CryptoAssetEnum } from '../enums/crypto-asset.enum';
import { validateMongoIdWithJoi } from 'src/common/validation/id/id.validator';
import * as joi from 'joi';

@InputType()
export class GetCryptoPortfolioBenchmarkingInput extends ValidationInput {
  @Field(() => ID, { description: 'The id of the portfolio' })
  portfolio: string;

  @Field(() => CryptoAssetEnum, {
    defaultValue: CryptoAssetEnum.BITCOIN,
    description: 'The asset to benchmark against example BITCOIN',
    nullable: true,
  })
  asset?: CryptoAssetEnum;

  public static validationSchema =
    joi.object<GetCryptoPortfolioBenchmarkingInput>({
      portfolio: validateMongoIdWithJoi('portfolio').required(),
      asset: joi.string().valid(...Object.values(CryptoAssetEnum)),
    });
}
