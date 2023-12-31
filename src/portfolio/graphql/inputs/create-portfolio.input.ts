import { InputType, Field } from '@nestjs/graphql';
import { ValidationInput } from 'src/common/validation';
import { validateNameWithJoi } from 'src/common/validation/strings/name/name.validator';
import * as joi from 'joi';

@InputType()
export class CreatePortfolioInput extends ValidationInput {
  @Field()
  name: string;

  public static validationSchema = joi.object<CreatePortfolioInput>({
    name: validateNameWithJoi.required(),
  });
}
