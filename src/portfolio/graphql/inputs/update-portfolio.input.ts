import { Field, InputType } from '@nestjs/graphql';
import * as joi from 'joi';
import { UpdatePortfolioPayload } from './update-portfolio.payload';
import { GetEntityByIdInput } from 'src/common/graphql/get-entity-by-id.input';
import { ValidationInput } from 'src/common/validation';
import { IUpdateEntity } from 'src/common/interfaces/update-entity.interface';

@InputType()
export class UpdatePortfolioInput
  extends ValidationInput
  implements IUpdateEntity
{
  @Field()
  where: GetEntityByIdInput;

  @Field()
  data: UpdatePortfolioPayload;

  public static validationSchema = joi.object<UpdatePortfolioInput>({
    where: GetEntityByIdInput.validationSchema.required(),
    data: UpdatePortfolioPayload.validationSchema.required(),
  });
}
