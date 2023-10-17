import { CustomHelpers } from 'joi';
import * as joi from 'joi';
import { _validateId } from './id.validator';
import { errorMessageBuilder } from 'src/common/errors/error-message-builder';
import { IDatabaseValidator } from 'src/common/interfaces/database-validator.interface';

export const _validateIds = (value: string[]): boolean => {
  if (!value) {
    return false;
  }

  if (value.length === 0) {
    return true;
  }

  for (let element of value) {
    if (!_validateId(element)) {
      return false;
    }
  }

  return true;
};

export const validateIds: IDatabaseValidator = {
  validator: _validateIds,
  message: errorMessageBuilder,
};

const customIdValidator = (value: any, helpers: CustomHelpers) => {
  const condition = _validateIds(value);
  if (!condition) {
    return helpers.error('any.invalid');
  }
  return value;
};

export const validateMongoIdsWithJoi = (fieldName = 'field') =>
  joi
    .array()
    .custom(customIdValidator, 'ObjectId validator')
    .messages({
      'any.invalid': `${fieldName}: received value is not a valid array of object ids`,
    });
