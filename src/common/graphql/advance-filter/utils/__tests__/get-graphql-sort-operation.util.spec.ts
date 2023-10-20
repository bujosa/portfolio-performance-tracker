import { MissingRequiredParametersError } from 'src/common/errors/missing-required-parameters.error';
import { getGraphqlSortOperation } from '../get-graphql-sort-operation.util';
import { InvalidGqlSortOperationError } from 'src/common/errors/filters';
import { GraphqlSortOperationEnum } from '../../graphql-sort-operation.enum';

describe('GetGraphqlSortOperation', () => {
  it('should throw an error if given null', () => {
    // arrange & act & assert
    expect(() => getGraphqlSortOperation(null)).toThrow(
      MissingRequiredParametersError,
    );
  });

  it('should throw an error if given undefined', () => {
    // arrange & act & assert
    expect(() => getGraphqlSortOperation(undefined)).toThrow(
      MissingRequiredParametersError,
    );
  });

  it('should throw an error if given an empty string', () => {
    // arrange & act & assert
    expect(() => getGraphqlSortOperation('')).toThrow(
      MissingRequiredParametersError,
    );
  });

  it.each([['no_op'], ['another_no_op']])(
    'should throw an error if it does not find a gql sort operation',
    (input) => {
      // arrange & act & assert
      expect(() => getGraphqlSortOperation(input)).toThrow(
        InvalidGqlSortOperationError,
      );
    },
  );

  it.each([
    ['asc', GraphqlSortOperationEnum.asc],
    ['desc', GraphqlSortOperationEnum.desc],
  ])(
    'should return the correct gql sort operation given a valid input',
    (input, expectedResult) => {
      // arrange & act
      const res = getGraphqlSortOperation(input);

      // assert
      expect(res).toEqual(expectedResult);
    },
  );
});
