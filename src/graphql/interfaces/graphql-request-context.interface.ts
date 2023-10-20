import { IGraphQLRequestContext } from 'src/common/interfaces/graphql-request-context.interface';
import { IGraphQLRequestContextLoaders } from './loaders.interface';

export type GraphQLRequestContext =
  IGraphQLRequestContext<IGraphQLRequestContextLoaders>;
