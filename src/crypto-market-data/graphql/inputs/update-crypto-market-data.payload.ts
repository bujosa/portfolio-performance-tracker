import { InputType, PartialType } from '@nestjs/graphql';
import * as joi from 'joi';
import { CreateCryptoMarketDataInput } from './create-crypto-market-data.input';
import { validateNameWithJoi } from 'src/common/validation/strings';

@InputType()
export class UpdateCryptoMarketDataPayload extends PartialType(
  CreateCryptoMarketDataInput,
) {
  public static validationSchema = joi
    .object<UpdateCryptoMarketDataPayload>({
      name: validateNameWithJoi,
    })
    .min(1);
}
