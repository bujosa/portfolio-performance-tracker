import { ArgumentMetadata } from '@nestjs/common';
import { JoiValidationPipe } from './joi-validation.pipe';
import { generateFakeWord } from '../testing/string';
import * as joi from 'joi';
import { InvalidUserInputError } from '../errors/invalid-user-input.error';

describe(JoiValidationPipe.name, () => {
  const joiValidationPipe = new JoiValidationPipe();

  class TestInput {
    public name: string;

    public static validationSchema = joi.object<any>({
      name: joi.string().required(),
    });
  }

  const metaData: ArgumentMetadata = {
    type: 'body',
    metatype: TestInput,
  };

  const case1 = [
    [{ name: generateFakeWord() }, metaData],
    [
      20,
      {
        type: 'body',
        metatype: Number,
      },
    ],
    [
      generateFakeWord(),
      {
        type: 'body',
        metatype: String,
      },
    ],
  ];

  describe('transform', () => {
    it.each(case1)(
      'should return the provided input if validations pass',
      (input: any, _metaData: any) => {
        // Act
        const res = joiValidationPipe.transform(input, _metaData);

        // Assert
        expect(res).toBe(input);
      },
    );

    it('should throw InvalidUserInputError if the provided input does not pass the validations', () => {
      // Arrange
      const fun = () => joiValidationPipe.transform({}, metaData);

      // Assert
      expect(fun).toThrow(InvalidUserInputError);
    });
  });
});
