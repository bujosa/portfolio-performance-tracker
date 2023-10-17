import { InternalServerError } from 'src/common/errors/internal-server.error';
import { MissingRequiredParametersError } from 'src/common/errors/missing-required-parameters.error';
import { GraphqlFilterOperation } from 'src/common/graphql/advance-filter/graphql-filter-operation.enum';
import {
  graphqlOperationToMongoOperation,
  MongoOperation,
} from '../../enum/mongo-filter-operation.enum';

export const getMongoFilterOperation = (
  gqlOperation: GraphqlFilterOperation,
): MongoOperation => {
  if (!gqlOperation) {
    throw new MissingRequiredParametersError('getMongoOperation');
  }

  const mongoOperation = graphqlOperationToMongoOperation[gqlOperation];

  if (!mongoOperation) {
    throw new InternalServerError();
  }

  return mongoOperation;
};
