import { InputType, PartialType } from '@nestjs/graphql';
import * as joi from 'joi';
import { CreateCryptoMarketDataInput } from './create-crypto-market-data.input';
import {
  validateISODateWithJoi,
  validateNameWithJoi,
} from 'src/common/validation/strings';
import { validatePositiveNumberWithJoi } from 'src/common/validation/number';

@InputType()
export class UpdateCryptoMarketDataPayload extends PartialType(
  CreateCryptoMarketDataInput,
) {
  public static validationSchema = joi
    .object<UpdateCryptoMarketDataPayload>({
      cryptoName: validateNameWithJoi,
      open: validatePositiveNumberWithJoi,
      high: validatePositiveNumberWithJoi,
      low: validatePositiveNumberWithJoi,
      close: validatePositiveNumberWithJoi,
      marketCap: validatePositiveNumberWithJoi,
      timestamp: validateISODateWithJoi('timestamp'),
      date: validateISODateWithJoi('date'),
    })
    .min(1);
}
