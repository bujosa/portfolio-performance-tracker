import { Field, InputType } from '@nestjs/graphql';
import * as joi from 'joi';
import { UpdateCryptoMarketDataPayload } from './update-crypto-market-data.payload';
import { GetEntityByIdInput } from 'src/common/graphql/get-entity-by-id.input';
import { ValidationInput } from 'src/common/validation';
import { IUpdateEntity } from 'src/common/interfaces/update-entity.interface';

@InputType()
export class UpdateCryptoMarketDataInput
  extends ValidationInput
  implements IUpdateEntity
{
  @Field()
  where: GetEntityByIdInput;

  @Field()
  data: UpdateCryptoMarketDataPayload;

  public static validationSchema = joi.object<UpdateCryptoMarketDataInput>({
    where: GetEntityByIdInput.validationSchema.required(),
    data: UpdateCryptoMarketDataPayload.validationSchema.required(),
  });
}
