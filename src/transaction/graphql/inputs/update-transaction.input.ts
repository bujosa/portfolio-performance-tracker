import { Field, InputType } from '@nestjs/graphql';
import { UpdateTransactionPayload } from './update-transaction.payload';
import { GetEntityByIdInput } from 'src/common/graphql/get-entity-by-id.input';
import { ValidationInput } from 'src/common/validation';
import { IUpdateEntity } from 'src/common/interfaces/update-entity.interface';
import * as joi from 'joi';

@InputType()
export class UpdateTransactionInput
  extends ValidationInput
  implements IUpdateEntity
{
  @Field()
  where: GetEntityByIdInput;

  @Field()
  data: UpdateTransactionPayload;

  public static validationSchema = joi.object<UpdateTransactionInput>({
    where: GetEntityByIdInput.validationSchema.required(),
    data: UpdateTransactionPayload.validationSchema.required(),
  });
}
