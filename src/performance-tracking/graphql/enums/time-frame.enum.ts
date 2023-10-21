import { registerEnumType } from '@nestjs/graphql';

export enum TimeFrameEnum {
  ONE_HOUR = 'ONE_HOUR',
  ONE_DAY = 'ONE_DAY',
  ONE_WEEK = 'ONE_WEEK',
  ONE_MONTH = 'ONE_MONTH',
  TWO_MONTHS = 'TWO_MONTHS',
  THREE_MONTHS = 'THREE_MONTHS',
}

registerEnumType(TimeFrameEnum, {
  name: 'TimeFrameEnum',
  description:
    'The time frame for which the portfolio is benchmarked against a cryptocurrency.',
});
