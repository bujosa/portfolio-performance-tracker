import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { IBaseEntity } from 'src/common/interfaces/base-entity.interface';
import { validateId } from 'src/common/validation/id/id.validator';
import { validatePositiveNumber } from 'src/common/validation/number';
import { validateIsoDate } from 'src/common/validation/strings';
import { validateName } from 'src/common/validation/strings/name/name.validator';
import { Portfolio } from 'src/portfolio/repository/entities';
import { ITransaction } from 'src/transaction/shared/transaction.interface';

@Schema({
  optimisticConcurrency: true,
  versionKey: 'version',
})
export class Transaction extends Document implements ITransaction, IBaseEntity {
  @Prop()
  id: string;

  @Prop({
    required: true,
    type: MongooseSchema.Types.ObjectId,
    validate: validateId,
    ref: Portfolio.name,
  })
  portfolio: string;

  @Prop({
    required: true,
    validate: validateName,
  })
  asset: string;

  @Prop({
    required: true,
    validate: validatePositiveNumber,
  })
  quantity: number;

  @Prop({
    required: true,
    validate: validatePositiveNumber,
  })
  price?: number;

  @Prop({
    required: true,
    validate: validateIsoDate,
  })
  date: string;

  version: number;

  @Prop({ required: true })
  updatedAt: string;

  @Prop({ required: true })
  createdAt: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);

TransactionSchema.pre('save', function (next) {
  this.id = this._id;

  next();
});
