import { ErrorCode } from './enums/error-code.enum';

export interface IErrorDetail {
  field: string;
  message: string;
}

/**
 * @class BaseError
 * @description
 * This is the base error class
 * @extends {Error}
 */
export abstract class BaseError extends Error {
  public code: string = ErrorCode.INTERNAL_SERVER_ERROR;
  public message = 'Internal server Error';
  public isPublic = true;
  public errors: IErrorDetail[] = [];

  constructor() {
    super();
    Object.setPrototypeOf(this, BaseError.prototype);
  }
}
