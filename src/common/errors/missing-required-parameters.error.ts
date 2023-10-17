import { Environment } from '../data/enums/environment.enum';
import { BaseError } from './base-error.abstract';

/**
 * @class MissingRequiredParametersError
 * @description
 * This error is thrown when the required parameters are missing
 * @extends {BaseError}
 * @param {string} functionName
 * @memberof Errors
 * @example
 * throw new MissingRequiredParametersError();
 * throw new MissingRequiredParametersError('functionName');
 */
export class MissingRequiredParametersError extends BaseError {
  constructor(functionName = 'function') {
    super();

    Object.setPrototypeOf(this, MissingRequiredParametersError.prototype);

    const isProdEnv = process.env.NODE_ENV === Environment.PRODUCTION;
    this.message = isProdEnv
      ? super.message
      : `Missing required input parameters in ${functionName}`;

    this.isPublic = !isProdEnv;
  }
}
