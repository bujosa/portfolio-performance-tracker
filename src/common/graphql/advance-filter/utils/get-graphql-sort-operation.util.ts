import { InvalidGqlSortOperationError } from 'src/common/errors/filters';
import { MissingRequiredParametersError } from 'src/common/errors/missing-required-parameters.error';
import {
  GraphqlSortOperation,
  GraphqlSortOperationEnum,
} from '../graphql-sort-operation.enum';

export const getGraphqlSortOperation = (
  operation: string,
): GraphqlSortOperation => {
  if (!operation) {
    throw new MissingRequiredParametersError('getGraphqlSortOperation');
  }

  const check = Object.values(GraphqlSortOperationEnum).includes(
    <GraphqlSortOperation>operation,
  );

  if (!check) {
    throw new InvalidGqlSortOperationError(operation);
  }

  return <GraphqlSortOperation>operation;
};
