import { Types } from 'mongoose';

/**
 * @description generate new mongoose id turned into mongoose.Types.ObjectId to hexString
 * @returns string
 */
export const generateId = (): string => new Types.ObjectId().toHexString();
