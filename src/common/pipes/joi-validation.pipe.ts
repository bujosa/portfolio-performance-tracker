import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { InvalidUserInputError } from '../errors/invalid-user-input.error';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.metatype && (metadata.metatype as any).validationSchema) {
      const { error } = (metadata.metatype as any).validationSchema.validate(
        value,
        {
          abortEarly: false,
        },
      );

      if (error) {
        throw InvalidUserInputError.fromJoiValidationError(error);
      }
    }

    return value;
  }
}
