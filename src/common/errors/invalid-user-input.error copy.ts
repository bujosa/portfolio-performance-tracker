import { Error as MongooseErrors } from 'mongoose';
import {
  formatMongooseValidationError,
  formatJoiValidationError,
} from './utils';
import * as joi from 'joi';
import { BaseError, IErrorDetail } from './base-error.abstract';
import { ErrorCode } from './enums/error-code.enum';

/**
 * @class InvalidUserInputError
 * @description
 * This error is thrown when the user input is invalid
 * @extends {BaseError}
 * @param {errors: IErrorDetail[]} errors
 * @memberof Errors
 * @example
 * throw new InvalidUserInputError();
 * @example
 * throw new InvalidUserInputError([ { field: 'email', message: 'Email is invalid' } ]);
 */
export class InvalidUserInputError extends BaseError {
  readonly code = ErrorCode.INVALID_USER_INPUT;
  readonly message = 'Invalid user input';
  public readonly isPublic = true;

  constructor(errors: IErrorDetail[] = []) {
    super();

    Object.setPrototypeOf(this, InvalidUserInputError.prototype);

    this.errors = errors;
  }

  static fromMongooseValidationError(error: MongooseErrors.ValidationError) {
    const errors: IErrorDetail[] = formatMongooseValidationError(error);

    return new InvalidUserInputError(errors);
  }

  static fromJoiValidationError(error: joi.ValidationError) {
    const errors: IErrorDetail[] = formatJoiValidationError(error);

    return new InvalidUserInputError(errors);
  }
}
