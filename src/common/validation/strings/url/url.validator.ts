import validator from 'validator';
import { CustomHelpers } from 'joi';
import { IDatabaseValidator } from 'src/common/interfaces/database-validator.interface';
import { errorMessageBuilder } from 'src/common/errors/error-message-builder';
import * as joi from 'joi';

export const _validateUrl = (value: string): boolean => {
  return validator.isURL(value);
};

export const validateUrl: IDatabaseValidator = {
  validator: _validateUrl,
  message: errorMessageBuilder,
};

const customUrlValidator = (value: any, helpers: CustomHelpers) => {
  const condition = _validateUrl(value);
  if (!condition) {
    return helpers.error('any.invalid');
  }
  return value;
};

export const validateUrlFormatWithJoi = (fieldName = 'field') =>
  joi
    .string()
    .custom(customUrlValidator, 'Url validator')
    .messages({
      'any.invalid': `${fieldName}: received value is not a valid url format`,
    });
