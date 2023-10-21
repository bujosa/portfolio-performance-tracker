import { InputType, Field } from '@nestjs/graphql';
import { ValidationInput } from 'src/common/validation';
import { validateNameWithJoi } from 'src/common/validation/strings/name/name.validator';
import { TransactionByWeightBasedInput } from './transaction-weight-based';
import * as joi from 'joi';

@InputType({
  description:
    'This input is used to create a portfolio with Weight Based example: BTC 50%, ETH 50% with a total of 100%. and The Budget for example 1000USD.',
})
export class CreatePortfolioWithWeightBasedInput extends ValidationInput {
  @Field({ description: 'Name of the porfolio' })
  name: string;

  @Field(() => [TransactionByWeightBasedInput])
  transactions: TransactionByWeightBasedInput[];

  @Field({
    description: `The budget of the transactions, example -> if you select 4 Cryptocurrency 
    and you put 25% each you need to specify the money of each cryptocurrency and 
    that amount come from this field, example of bugget 5000USD `,
  })
  budget: number;

  public static validationSchema =
    joi.object<CreatePortfolioWithWeightBasedInput>({
      name: validateNameWithJoi.required(),
      transactions: joi
        .array()
        .items(TransactionByWeightBasedInput.validationSchema)
        .min(1)
        .custom((transactions, helpers) => {
          const totalWeight = transactions.reduce(
            (acc, curr) => acc + curr.weight,
            0,
          );
          if (totalWeight !== 100) {
            return helpers.error('transations.weight.invalid', {
              value: totalWeight,
            });
          }
          return transactions;
        })
        .message('The total weight must be 100%'),
    });
}
