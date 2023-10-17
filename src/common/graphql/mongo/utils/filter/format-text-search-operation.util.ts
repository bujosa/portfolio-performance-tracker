import { InvalidSearchValueError } from 'src/common/errors/filters';

export const formatTextSearchOperation = (value: string) => {
  if (!value) {
    return {
      $search: '',
    };
  }

  if (typeof value !== 'string') {
    throw new InvalidSearchValueError(value);
  }

  return {
    $search: value,
  };
};
