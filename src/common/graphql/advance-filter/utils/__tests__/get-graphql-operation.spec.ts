import { getGqlOperation } from '../get-graphql-operation.util';
import { IGetGraphqlOperationResult } from '../../interfaces/get-graphql-operation-result.interface';
import {
  MissingRequiredParametersError,
  InvalidGqlFilterOperationError,
  InvalidFieldNameFilterError
} from '@packages/errors';

describe('getGqlOperation', () => {
  it('should throw an erro if the input is null', () => {
    expect(() => getGqlOperation(null)).toThrow(MissingRequiredParametersError);
  });

  it('should throw an error if the input is undefined', () => {
    expect(() => getGqlOperation(undefined)).toThrow(
      MissingRequiredParametersError
    );
  });

  it('should throw an error if the input is an empty string', () => {
    expect(() => getGqlOperation('')).toThrow(MissingRequiredParametersError);
  });

  it.each([
    ['a_wrongly_formatted_field'],
    ['another_wrongly_formatted_field'],
    ['this_is_another_wrongly_formatted_field']
  ])(
    'should throw an error if the input string has more than one _ -> "%s"',
    (input: string) => {
      expect(() => getGqlOperation(input)).toThrow(InvalidFieldNameFilterError);
    }
  );

  it.each([
    ['category_name'],
    ['random_field'],
    ['no_operation'],
    ['fake_filter']
  ])(
    'should throw an error if the input string has no operation a valid operation -> "%s"',
    (input: string) => {
      expect(() => getGqlOperation(input)).toThrow(
        InvalidGqlFilterOperationError
      );
    }
  );

  it.each([
    ['category_in', { fieldName: 'category', gqlOperation: 'in' }],
    ['year_gte', { fieldName: 'year', gqlOperation: 'gte' }]
  ])(
    'should return the field name and the gql operation',
    (input: string, expectedResult: IGetGraphqlOperationResult) => {
      // Act
      const res = getGqlOperation(input);

      // Assert
      expect(res).toEqual(expectedResult);
    }
  );
});
