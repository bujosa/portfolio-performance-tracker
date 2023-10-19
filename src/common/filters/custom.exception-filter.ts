import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { GqlContextType } from '@nestjs/graphql';
import { DuplicateKeyError } from '../errors/duplicate-key.error';
import { ErrorCode } from '../errors/enums/error-code.enum';
import { InvalidUserInputError } from '../errors/invalid-user-input.error';

@Catch()
export class CustomExceptionsFilter implements ExceptionFilter {
  constructor() {}

  catch(exception: any, host: ArgumentsHost) {
    const hostType = host.getType() as GqlContextType;
    const handledException = this.handleException(exception);

    if (hostType === 'graphql') {
      return handledException;
    }
  }

  private handleException(exception: any) {
    let handledException = exception;

    if (
      exception.name &&
      exception.name === 'MongoServerError' &&
      exception.code === 11000
    ) {
      handledException = new DuplicateKeyError(exception.message);
    }

    if (exception.code == ErrorCode.INVALID_STATUS_CODE) {
      handledException = new InvalidUserInputError(exception.errors);
    }

    return handledException;
  }
}
