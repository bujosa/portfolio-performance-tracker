import { Types } from 'mongoose';

export type HistoricalDataMongooseObject = {
  _id: Types.ObjectId;
  id: string;
  open: number;
  high: number;
  low: number;
  close: number;
  marketCap: number;
  timestamp: string;
  cryptoName: string;
  date: string;
  version: number;
  createdAt: string;
  updatedAt: string;
};
