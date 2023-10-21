import { BaseError } from './base-error.abstract';
import { ErrorCode } from './enums/error-code.enum';

/**
 * @class InvalidCustomMessageError
 * @description
 * This error is thrown when the user has already performed the operation
 * @extends {BaseError}
 * @memberof Errors
 * @example
 * throw new InvalidCustomMessageError();
 * throw new InvalidCustomMessageError('Custom message');
 */
export class InvalidCustomMessageError extends BaseError {
  code: ErrorCode.INVALID_OPERATION = ErrorCode.INVALID_OPERATION;

  constructor(message = 'Invalid Operation') {
    super();

    Object.setPrototypeOf(this, InvalidCustomMessageError.prototype);
    this.message = message;
  }
}
