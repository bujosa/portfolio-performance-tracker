import { IErrorMessageBuilderProps } from './error-message-builder-props.interface';

export interface IDatabaseValidator {
  validator: (value: any) => boolean;
  message: (value: IErrorMessageBuilderProps) => string;
}
