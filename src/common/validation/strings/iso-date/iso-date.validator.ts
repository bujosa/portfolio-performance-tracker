import { IDatabaseValidator } from 'src/common/interfaces/database-validator.interface';
import { errorMessageBuilder } from 'src/common/errors/error-message-builder';
import validator from 'validator';
import { CustomHelpers } from 'joi';
import * as joi from 'joi';

export const _validateIsoDate = (value: string): boolean => {
  return validator.isISO8601(value, { strict: true });
};

export const validateIsoDate: IDatabaseValidator = {
  validator: _validateIsoDate,
  message: errorMessageBuilder,
};

const customIsoDateValidator = (value: string, helpers: CustomHelpers) => {
  const condition = _validateIsoDate(value);
  if (!condition) {
    return helpers.error('any.invalid');
  }
  return value;
};

export const validateISODateWithJoi = (fieldName = 'field') =>
  joi
    .string()
    .custom(customIsoDateValidator, 'IsoDate validator')
    .messages({
      'any.invalid': `${fieldName}: received value is not a valid isodate`,
    });
