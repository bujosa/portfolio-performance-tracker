import { InputType, OmitType, PartialType } from '@nestjs/graphql';
import { CreateTransactionInput } from './create-transaction.input';
import {
  validateISODateWithJoi,
  validateNameWithJoi,
} from 'src/common/validation/strings';
import { validatePositiveNumberWithJoi } from 'src/common/validation/number';
import * as joi from 'joi';

@InputType()
export class UpdateTransactionPayload extends PartialType(
  OmitType(CreateTransactionInput, ['portfolio']),
) {
  public static validationSchema = joi
    .object<UpdateTransactionPayload>({
      asset: validateNameWithJoi,
      quantity: validatePositiveNumberWithJoi,
      price: validatePositiveNumberWithJoi,
      date: validateISODateWithJoi('date'),
    })
    .min(1);
}
