import { BaseError } from './base-error.abstract';
import { ErrorCode } from './enums/error-code.enum';

/**
 * @description
 * Error thrown when an entity is not found
 * @class EntityNotFoundError
 * @extends {BaseError}
 * @memberof Errors
 * @example
 * throw new EntityNotFoundError();
 * throw new EntityNotFoundError('user');
 */
export class EntityNotFoundError extends BaseError {
  public readonly code: ErrorCode.ENTITY_NOT_FOUND = ErrorCode.ENTITY_NOT_FOUND;
  public readonly isPublic = true;

  constructor(entityName = 'entity') {
    super();

    Object.setPrototypeOf(this, EntityNotFoundError.prototype);
    this.message = `${entityName} not found`.toLowerCase();
  }
}
