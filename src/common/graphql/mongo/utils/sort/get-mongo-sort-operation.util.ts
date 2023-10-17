import {
  graphqlSortOperationToMongoSortOperation,
  MongoSortOperation,
} from '../../enum/mongo-sort-operation.enum';
import { GraphqlSortOperation } from 'src/common/graphql/advance-filter/graphql-sort-operation.enum';
import { MissingRequiredParametersError } from 'src/common/errors/missing-required-parameters.error';
import { InvalidMongoSortOperarationError } from 'src/common/errors/filters';

export const getMongoSortOperation = (
  gqlSortOperation: GraphqlSortOperation,
): MongoSortOperation => {
  if (!gqlSortOperation) {
    throw new MissingRequiredParametersError('getMongoSortOperation');
  }

  const mongoSortOperation =
    graphqlSortOperationToMongoSortOperation[gqlSortOperation];

  if (!mongoSortOperation) {
    throw new InvalidMongoSortOperarationError(gqlSortOperation);
  }

  return mongoSortOperation;
};
