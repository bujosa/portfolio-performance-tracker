import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IAsset } from 'src/asset/shared/asset.interface';
import { IBaseEntity } from 'src/common/interfaces/base-entity.interface';
import { validateName, validateSlug } from 'src/common/validation/strings';
import { validateUrl } from 'src/common/validation/strings/url';

@Schema({
  optimisticConcurrency: true,
  versionKey: 'version',
})
export class Asset extends Document implements IAsset, IBaseEntity {
  @Prop()
  id: string;

  @Prop({
    required: true,
    validate: validateName,
  })
  name: string;

  @Prop({
    required: true,
    unique: true,
    validate: validateSlug,
  })
  slug: string;

  @Prop({
    required: true,
    validate: validateName,
  })
  symbol: string;

  @Prop({
    required: true,
    validate: validateUrl,
  })
  url: string;

  version: number;

  @Prop({ required: true })
  updatedAt: string;

  @Prop({ required: true })
  createdAt: string;
}

export const AssetSchema = SchemaFactory.createForClass(Asset);

AssetSchema.pre('save', function (next) {
  this.id = this._id;

  next();
});
