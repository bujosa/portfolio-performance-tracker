import { InputType, PartialType } from '@nestjs/graphql';
import * as joi from 'joi';
import { CreatePortfolioInput } from './create-portfolio.input';
import { validateNameWithJoi } from 'src/common/validation/strings';

@InputType()
export class UpdatePortfolioPayload extends PartialType(CreatePortfolioInput) {
  public static validationSchema = joi
    .object<UpdatePortfolioPayload>({
      name: validateNameWithJoi,
    })
    .min(1);
}
