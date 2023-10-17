import { IErrorMessageBuilderProps } from '../interfaces/error-message-builder-props.interface';

export const errorMessageBuilder = (props: IErrorMessageBuilderProps): string =>
  `Invalid value ${props.value} at field ${props.path}`;
