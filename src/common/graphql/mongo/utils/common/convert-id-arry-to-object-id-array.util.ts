import { Types } from 'mongoose';
import { _validateIds } from 'src/common/validation/id/ids.validator';

export const convertIdArrayToObjectIdArray = (
  input: string[],
): Types.ObjectId[] | any[] => {
  if (_validateIds(input)) {
    return input.map((el) => new Types.ObjectId(el));
  }

  return input;
};
