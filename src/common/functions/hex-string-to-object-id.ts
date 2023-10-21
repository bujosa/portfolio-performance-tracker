import { Types } from 'mongoose';
import { _validateId } from '../validation/id/id.validator';
import { InvalidCustomMessageError } from '../errors/custom-message.error';

/**
 * @description This function is for converting a string to mongoose.Types.ObjectId {@link Types.ObjectId}
 *
 * @param id {string | Types.ObjectId}
 *
 * @returns valid {@link Types.ObjectId}
 *
 * @throws {InvalidOperationError} if the value passed is not a valid id
 */
export const hexStringToObjectId = (
  id: string | Types.ObjectId,
): Types.ObjectId => {
  if (id instanceof Types.ObjectId) {
    return id;
  }

  if (_validateId(id)) {
    return new Types.ObjectId(id);
  }

  throw new InvalidCustomMessageError(`This value ${id} is not a valid id`);
};
