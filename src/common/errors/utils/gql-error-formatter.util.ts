import { IErrorDetail } from '../base-error.abstract';

export interface IGqlError {
  code: string;
  message: string;
  errors: IErrorDetail[];
  extensions?: Record<string, any>;
}

export const gqlErrorFormatter = (err: IGqlError): IGqlError => {
  // Note: In the future, we can add more logic here to format the error
  return err;
};
