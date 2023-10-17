import { Types } from 'mongoose';
import { _validateId } from 'src/common/validation/id/id.validator';

export const convertIdToObjectId = (input: string): Types.ObjectId | any => {
  if (_validateId(input)) {
    return new Types.ObjectId(input);
  }

  return input;
};
