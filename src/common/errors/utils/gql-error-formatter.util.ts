import { GraphQLError } from 'graphql';
import { BaseError, IErrorDetail } from '../base-error.abstract';
import { ErrorCode } from '../enums/error-code.enum';
import { Environment } from 'src/common/data/enums/environment.enum';
import { InternalServerError } from '../internal-server.error';

export interface IGqlError {
  code: string;
  message: string;
  errors: IErrorDetail[];
  extensions?: Record<string, any>;
}

export const gqlErrorFormatter = (err, another): IGqlError => {
  const { originalError } = err;
  const isProdEnv = process.env.NODE_ENV === Environment.PRODUCTION;

  // const fs = require('fs');
  // fs.appendFile(
  //   'logs.txt',
  //   JSON.stringify(err) + '\n' + 'Another:' + JSON.stringify(another) + '\n',
  //   function (err) {
  //     if (err) throw err;
  //     console.log('Saved!');
  //   },
  // );

  if (originalError instanceof BaseError) {
    return _baseErrorFormatter(err, isProdEnv);
  }

  return _internalServerErrorFormatter(err, isProdEnv);
};

const _baseErrorFormatter = (
  err: GraphQLError,
  isProdEnv = false,
): IGqlError => {
  const { originalError, extensions } = err;
  const baseError = originalError as BaseError;
  const { errors } = baseError;

  let { code, message } = baseError;

  console.log('Hi from gql error formatter' + JSON.stringify(baseError));

  if (!baseError.isPublic) {
    message = 'internal server error';
    code = ErrorCode.INTERNAL_SERVER_ERROR;
  }

  return {
    code,
    errors,
    message,
    extensions: isProdEnv ? undefined : extensions,
  };
};

const _internalServerErrorFormatter = (
  err: GraphQLError,
  isProdEnv = false,
): IGqlError => {
  const { message, extensions } = err;

  const internalServerError = new InternalServerError();

  return {
    code: internalServerError.code,
    errors: internalServerError.errors,
    message: isProdEnv ? internalServerError.message : message,
    extensions: isProdEnv ? undefined : extensions,
  };
};
