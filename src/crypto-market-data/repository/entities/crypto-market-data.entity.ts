import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IBaseEntity } from 'src/common/interfaces/base-entity.interface';
import { validateIsoDate, validateName } from 'src/common/validation/strings';
import { ICryptoMarketData } from 'src/crypto-market-data/shared/crypto-market-data.interface';

@Schema({
  optimisticConcurrency: true,
  versionKey: 'version',
})
export class CryptoMarketData
  extends Document
  implements ICryptoMarketData, IBaseEntity
{
  @Prop()
  id: string;

  @Prop({
    required: true,
    validate: validateName,
  })
  cryptoName: string;

  @Prop({
    required: true,
  })
  open: number;

  @Prop({
    required: true,
  })
  high: number;

  @Prop({
    required: true,
  })
  low: number;

  @Prop({
    required: true,
  })
  close: number;

  @Prop({
    required: true,
  })
  marketCap: number;

  @Prop({
    required: true,
    validate: validateIsoDate,
  })
  timestamp: string;

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

export const CryptoMarketDataSchema =
  SchemaFactory.createForClass(CryptoMarketData);

CryptoMarketDataSchema.pre('save', function (next) {
  this.id = this._id;

  next();
});
