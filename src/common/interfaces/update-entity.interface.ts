import { IGetEntityById } from './get-entity-by-id.interface';

export interface IUpdateEntity<T = Record<any, any>> {
  where: IGetEntityById;
  data: T;
}
