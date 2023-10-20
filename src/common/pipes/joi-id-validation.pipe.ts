import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { validateMongoIdWithJoi } from '../validation/id/id.validator';
import { InvalidUserInputError } from '../errors/invalid-user-input.error';
import { formatJoiValidationError } from '../errors/utils';

@Injectable()
export class ValidateObjectIdPipe implements PipeTransform<string> {
  transform(value: string): string {
    const { error } = validateMongoIdWithJoi('id').validate(value);
    if (error) {
      const errors = formatJoiValidationError(error);
      throw new InvalidUserInputError(errors);
    }
    return value;
  }
}
