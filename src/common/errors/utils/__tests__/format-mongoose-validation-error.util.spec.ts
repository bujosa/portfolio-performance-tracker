import { Error as MongooseErrors } from 'mongoose';
import { formatMongooseValidationError } from '../format-mongoose-validation-error.util';
import { IErrorDetail } from '../../base-error.abstract';

describe('FormatMongooseValidationError', () => {
  const errorMessage = 'Something went wrong';

  it('should return an empty array given null', () => {
    // Act
    const res = formatMongooseValidationError(null);

    // Assert
    expect(res).toEqual([]);
  });

  it('should return an empty array given undefined', () => {
    // Act
    const res = formatMongooseValidationError(undefined);

    // Assert
    expect(res).toEqual([]);
  });

  it('should skip values that are in the skip map', () => {
    // Arrange
    const input = {
      errors: {
        slug: {
          message: errorMessage,
        },
      },
    };

    // Act
    const res = formatMongooseValidationError(
      input as unknown as MongooseErrors.ValidationError,
    );

    // Assert
    expect(res).toEqual([]);
  });

  const firstTestCase = () => {
    const input = {
      errors: {
        name: {
          message: errorMessage,
        },
      },
    };

    const expectedResult: IErrorDetail[] = [
      {
        field: 'name',
        message: errorMessage,
      },
    ];

    return [input, expectedResult];
  };

  const secondTestCase = () => {
    const input = {
      errors: {
        name: {
          message: errorMessage,
        },
        slug: {
          message: errorMessage,
        },
      },
    };

    const expectedResult: IErrorDetail[] = [
      {
        field: 'name',
        message: errorMessage,
      },
    ];

    return [input, expectedResult];
  };

  it.each([firstTestCase(), secondTestCase()])(
    'should return an array of IErrorDetail',
    (input, expectedResult) => {
      // Act
      const res = formatMongooseValidationError(
        input as unknown as MongooseErrors.ValidationError,
      );

      // Assert
      expect(res).toEqual(expectedResult);
    },
  );
});
