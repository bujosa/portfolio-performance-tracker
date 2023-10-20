import { IServiceLoader } from 'src/common/interfaces/service-loader.interface';

export type BaseDataLoaderBuilderOptions<T = IServiceLoader> = {
  service: T;
  fieldName: string;
};
