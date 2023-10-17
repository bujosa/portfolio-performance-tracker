import { Field, ID, InputType } from '@nestjs/graphql';
import * as joi from 'joi';
import { ValidationInput } from '../validation';
import { validateMongoIdWithJoi } from '../validation/id/id.validator';
import { IGetEntityById } from '../interfaces/get-entity-by-id.interface';

@InputType()
export class GetEntityByIdInput
  extends ValidationInput
  implements IGetEntityById
{
  @Field(() => ID)
  id: string;

  public static validationSchema = joi.object<GetEntityByIdInput>({
    id: validateMongoIdWithJoi('id').required(),
  });
}
