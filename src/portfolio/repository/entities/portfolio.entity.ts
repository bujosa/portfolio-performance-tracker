import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IBaseEntity } from 'src/common/interfaces/base-entity.interface';
import { validateName } from 'src/common/validation/strings/name/name.validator';
import { validateSlug } from 'src/common/validation/strings/slug';
import { IPortfolio } from 'src/portfolio/shared/portfolio.interface';

@Schema({
  optimisticConcurrency: true,
  versionKey: 'version',
})
export class Portfolio extends Document implements IPortfolio, IBaseEntity {
  @Prop()
  id: string;

  @Prop({
    required: true,
    validate: validateName,
  })
  name: string;

  version: number;

  @Prop({ required: true })
  updatedAt: string;

  @Prop({ required: true })
  createdAt: string;
}

export const PortfolioSchema = SchemaFactory.createForClass(Portfolio);

PortfolioSchema.pre('save', function (next) {
  this.id = this._id;

  next();
});
