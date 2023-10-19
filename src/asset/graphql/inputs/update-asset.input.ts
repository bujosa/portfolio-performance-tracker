import { Field, InputType } from '@nestjs/graphql';
import { UpdateAssetPayload } from './update-asset.payload';
import { GetEntityByIdInput } from 'src/common/graphql/get-entity-by-id.input';
import { ValidationInput } from 'src/common/validation';
import { IUpdateEntity } from 'src/common/interfaces/update-entity.interface';
import * as joi from 'joi';

@InputType()
export class UpdateAssetInput extends ValidationInput implements IUpdateEntity {
  @Field()
  where: GetEntityByIdInput;

  @Field()
  data: UpdateAssetPayload;

  public static validationSchema = joi.object<UpdateAssetInput>({
    where: GetEntityByIdInput.validationSchema.required(),
    data: UpdateAssetPayload.validationSchema.required(),
  });
}
