import { MongoOperation } from '../../mongo/enum/mongo-filter-operation.enum';
import { GraphqlFilterOperation } from '../graphql-filter-operation.enum';

export interface IFormatMongooperationInput {
  mongoOperation: MongoOperation;
  gqlOperation: GraphqlFilterOperation;
  fieldName: string;
  value: any;
}
