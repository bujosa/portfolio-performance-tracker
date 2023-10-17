import validator from 'validator';
import * as joi from 'joi';
import { IDatabaseValidator } from 'src/common/interfaces/database-validator.interface';
import { errorMessageBuilder } from 'src/common/errors/error-message-builder';
import { isSlug } from 'src/common/functions/is-slug';

export const _validateSlug = (value: string): boolean => {
  if (!value) {
    return false;
  }

  const lowerCaseValue = value.toLowerCase();

  if (lowerCaseValue !== value) {
    return false;
  }

  if (value.length <= 2) {
    return isSlug(value);
  }

  return validator.isSlug(value);
};

export const validateSlug: IDatabaseValidator = {
  validator: _validateSlug,
  message: errorMessageBuilder,
};

const joiSlugValidator = (value: any, helpers: joi.CustomHelpers) => {
  if (!_validateSlug(value)) {
    return helpers.error('any.invalid');
  }
  return value;
};

export const validateSlugWithJoi = joi
  .string()
  .custom(joiSlugValidator, 'slug validator')
  .messages({ 'any.invalid': 'Invalid slug' });
