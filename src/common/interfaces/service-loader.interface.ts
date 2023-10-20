import { IBaseGraphqlFilterInput } from './base-graphql-filter-input.interface';

export interface IServiceLoader {
  getEntities: (filterInput: IBaseGraphqlFilterInput) => Promise<any>;
}
