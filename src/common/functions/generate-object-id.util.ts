import { Types } from 'mongoose';

/**
 * @description generate new mongoose
 * @returns Types.ObjectId
 */
export const generateObjectId = (): Types.ObjectId => new Types.ObjectId();
