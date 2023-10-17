import { GraphqlFilterOperation } from '../graphql-filter-operation.enum';

export interface IGetGraphqlOperationResult {
  fieldName: string;
  gqlOperation: GraphqlFilterOperation;
}
