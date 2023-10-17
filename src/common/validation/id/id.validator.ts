import { isValidObjectId, Types } from 'mongoose';
import { CustomHelpers } from 'joi';
import * as joi from 'joi';
import { IDatabaseValidator } from 'src/common/interfaces/database-validator.interface';
import { errorMessageBuilder } from 'src/common/errors/error-message-builder';

export const _validateId = (value: any): boolean => {
  try {
    if (!value) {
      return false;
    }

    const isMongooseValidId = isValidObjectId(value);

    if (!isMongooseValidId) {
      return false;
    }

    if (value._id && isValidObjectId(value._id)) {
      return true;
    }

    new Types.ObjectId(value);

    if (value.toString().length < 24) {
      return false;
    }

    return true;
  } catch (err) {
    return false;
  }
};

export const validateId: IDatabaseValidator = {
  validator: _validateId,
  message: errorMessageBuilder,
};

// Example custom validator
const customIdValidator = (value: any, helpers: CustomHelpers) => {
  const condition = _validateId(value);
  if (!condition) {
    return helpers.error('any.invalid');
  }
  return value;
};

export const validateMongoIdWithJoi = (fieldName = 'field') =>
  joi
    .string()
    .custom(customIdValidator, 'ObjectId validator')
    .messages({
      'any.invalid': `${fieldName}: received value is not a valid object id`,
    });
