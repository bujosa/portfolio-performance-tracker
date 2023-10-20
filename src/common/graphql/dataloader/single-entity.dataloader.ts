import * as DataLoader from 'dataloader';
import { BaseDataLoaderBuilderOptions } from './base-dataloader-options.type';
import { FilterInput } from '../graphql-filter.input';

export const baseSingleEntityDataLoaderBuilder = <T>({
  fieldName,
  service,
}: BaseDataLoaderBuilderOptions): DataLoader<string, T, string> =>
  new DataLoader(async (ids: string[]) => {
    const filterInput: FilterInput = {
      where: {
        [`${fieldName}_in`]: [
          ...new Set<string>(ids.map((id) => id.toString())),
        ],
      },
    };

    const entities = await service.getEntities(filterInput);

    const entitiesMap = entities.reduce((prev, curr) => {
      return prev.set(curr[fieldName].toString(), curr);
    }, new Map<string, T>());

    return ids.map((id) => entitiesMap.get(id.toString()));
  });
