import { BaseError, IErrorDetail } from './base-error.abstract';
import { ErrorCode } from './enums/error-code.enum';

export type DuplicateKeyErrorDetail<T = any> = Partial<
  Record<keyof T, T[keyof T]>
>;

type DuplicateKeyErrorConstructorOptions = {
  field: string;
  value: string;
  errors?: DuplicateKeyErrorDetail[];
};

interface IMongoDBDuplicateKeyError {
  code: 11000;
  keyPattern: Record<string, any>;
  keyValue: Record<string, any>;
}

const getErrorMessage = ({ field, value }) => {
  return `Duplicate key error. Field: ${field} | Value: ${value}`;
};

const getErrorDetailMessage = ({ error = {} }) => {
  const errorKeys = Object.keys(error);
  const stringfiedError = errorKeys.reduce(
    (acc: string, curr: string, idx: number) => {
      const value = error[curr];

      return `${acc}${curr}=${value}${
        idx !== errorKeys.length - 1 ? ', ' : ''
      }`;
    },
    '',
  );

  return `Entity with the following field combination already exists: ${stringfiedError}`;
};

const getErrorDetail = ({
  errors = [],
}: {
  errors?: DuplicateKeyErrorDetail[];
}): IErrorDetail[] => {
  return errors.map((error) => {
    const keys = Object.keys(error);

    return {
      // formats the stringified array into the following string elem1, elem2 instead of elem1,elm2
      field: `${keys}`.replace(/,/g, ', '),
      message: getErrorDetailMessage({ error }),
    };
  });
};

/**
 * Error thrown when a duplicate key error is detected
 * @class DuplicateKeyError
 * @extends {BaseError}
 * @param {string} field
 * @param {string} value
 * @param {DuplicateKeyErrorDetail[]} errors
 * @memberof Errors
 * @example
 * throw DuplicateKeyError.fromMongoDBDuplicateKeyError(error);
 * @example
 * throw DuplicateKeyError.fromMongoDBDuplicateKeyError(error, { language: LanguageCodeEnum.EN });
 * @example
 * throw DuplicateKeyError.fromMongoDBDuplicateKeyError(error, { language: LanguageCodeEnum.ES });
 * @example
 * throw DuplicateKeyError.fromMongoDBDuplicateKeyError(error, { language: LanguageCodeEnum.DEFAULT });
 */
export class DuplicateKeyError extends BaseError {
  readonly code: ErrorCode.DUPLICATE_KEY = ErrorCode.DUPLICATE_KEY;

  constructor({
    field,
    value,
    errors = [],
  }: DuplicateKeyErrorConstructorOptions) {
    super();

    Object.setPrototypeOf(this, DuplicateKeyError.prototype);

    this.message = getErrorMessage({ field, value });

    this.errors = getErrorDetail({ errors });
  }

  static fromMongoDBDuplicateKeyError(
    error: IMongoDBDuplicateKeyError,
  ): DuplicateKeyError {
    const [field = 'field'] = Object.keys(error.keyValue);
    const value = error.keyValue[field] ?? 'missing value';

    return new DuplicateKeyError({
      field,
      value,
    });
  }
}
