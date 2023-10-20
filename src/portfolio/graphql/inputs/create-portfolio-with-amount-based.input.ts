import { InputType, Field } from '@nestjs/graphql';
import { ValidationInput } from 'src/common/validation';
import { validateNameWithJoi } from 'src/common/validation/strings/name/name.validator';
import * as joi from 'joi';
import { TransactionByAmountBasedInput } from './transaction-amount-based';

@InputType({
  description:
    'This input is used to create a portfolio with Amount Based example: 1 BTC, 2 ETH etc.',
})
export class CreatePortfolioWithAmountBasedInput extends ValidationInput {
  @Field()
  name: string;

  @Field(() => [TransactionByAmountBasedInput])
  transactions: TransactionByAmountBasedInput[];

  public static validationSchema =
    joi.object<CreatePortfolioWithAmountBasedInput>({
      name: validateNameWithJoi.required(),
      transactions: joi
        .array()
        .items(TransactionByAmountBasedInput.validationSchema)
        .min(1),
    });
}
