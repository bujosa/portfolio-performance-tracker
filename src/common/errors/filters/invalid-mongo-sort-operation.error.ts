import { Environment } from 'src/common/data/enums/environment.enum';
import { BaseError } from '../base-error.abstract';

export class InvalidMongoSortOperarationError extends BaseError {
  constructor(operation: string) {
    super();

    Object.setPrototypeOf(this, InvalidMongoSortOperarationError.prototype);

    const isProdEnv = process.env.NODE_ENV === Environment.PRODUCTION;
    this.message = isProdEnv
      ? super.message
      : `Invalid mongo sort operation filter operation: "${operation}" is not defined`;
  }
}
