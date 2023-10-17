import { formatMongoFilterOperation } from './format-mongo-filter-operation.util';
import { faker } from '@faker-js/faker';
import { MongoFilterOperationEnum } from '../../enum/mongo-filter-operation.enum';
import { IFormatMongooperationInput } from 'src/common/graphql/advance-filter/interfaces/format-mongo-operation-input.interface';
import { GraphqlFilterOperationEnum } from 'src/common/graphql/advance-filter/graphql-filter-operation.enum';
import { generateFakeWord } from 'src/common/testing/string';
import { MissingRequiredParametersError } from 'src/common/errors/missing-required-parameters.error';

const firstSuccessCase = () => {
  const value = generateFakeWord();
  const fieldName = generateFakeWord();

  const expectedResult = { [MongoFilterOperationEnum.$eq]: value };

  const input: IFormatMongooperationInput = {
    gqlOperation: GraphqlFilterOperationEnum.eq,
    mongoOperation: MongoFilterOperationEnum.$eq,
    value,
    fieldName,
  };

  return [input, expectedResult];
};

describe('FormatMongoOperation', () => {
  it('should throw an error if mongoOperation is null', () => {
    // arrange
    const fieldName = generateFakeWord();

    const input: IFormatMongooperationInput = {
      gqlOperation: GraphqlFilterOperationEnum.contains,
      mongoOperation: null,
      value: generateFakeWord(),
      fieldName,
    };

    // act & assert
    expect(() => formatMongoFilterOperation(input)).toThrow(
      MissingRequiredParametersError,
    );
  });

  it('should throw an error if mongoOperation is undefined', () => {
    // arrange
    const fieldName = generateFakeWord();

    const input: IFormatMongooperationInput = {
      gqlOperation: GraphqlFilterOperationEnum.contains,
      mongoOperation: undefined,
      value: generateFakeWord(),
      fieldName,
    };

    // act & assert
    expect(() => formatMongoFilterOperation(input)).toThrow(
      MissingRequiredParametersError,
    );
  });

  it('should throw an error if gqlOperation is null', () => {
    // arrange
    const fieldName = generateFakeWord();

    const input: IFormatMongooperationInput = {
      gqlOperation: null,
      mongoOperation: MongoFilterOperationEnum.$eq,
      value: generateFakeWord(),
      fieldName,
    };

    // act & assert
    expect(() => formatMongoFilterOperation(input)).toThrow(
      MissingRequiredParametersError,
    );
  });

  it('should throw an error if gqlOperation is undefined', () => {
    // arrange
    const fieldName = generateFakeWord();

    const input: IFormatMongooperationInput = {
      gqlOperation: undefined,
      mongoOperation: MongoFilterOperationEnum.$eq,
      value: generateFakeWord(),
      fieldName,
    };

    // act & assert
    expect(() => formatMongoFilterOperation(input)).toThrow(
      MissingRequiredParametersError,
    );
  });

  it('should throw an error if fieldName is null', () => {
    // arrange
    const input: IFormatMongooperationInput = {
      gqlOperation: GraphqlFilterOperationEnum.contains,
      mongoOperation: MongoFilterOperationEnum.$eq,
      value: generateFakeWord(),
      fieldName: null,
    };

    // act & assert
    expect(() => formatMongoFilterOperation(input)).toThrow(
      MissingRequiredParametersError,
    );
  });

  it('should throw an error if fieldName is undefined', () => {
    // arrange
    const input: IFormatMongooperationInput = {
      gqlOperation: GraphqlFilterOperationEnum.contains,
      mongoOperation: MongoFilterOperationEnum.$eq,
      value: generateFakeWord(),
      fieldName: undefined,
    };

    // act & assert
    expect(() => formatMongoFilterOperation(input)).toThrow(
      MissingRequiredParametersError,
    );
  });

  it.each([firstSuccessCase()])(
    'should return the formatted mongo operation',
    (
      input: IFormatMongooperationInput,
      expectedResult: Record<string, any>,
    ) => {
      // arrange

      // act
      const res = formatMongoFilterOperation(input);

      // assert
      expect(res).toEqual(expectedResult);
    },
  );
});
