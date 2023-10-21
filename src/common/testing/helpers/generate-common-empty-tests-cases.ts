import { TestCase } from './test-case.type';

export const generateCommonEmptyTestCases = (
  field: string,
  errorMessageCheck = field,
): TestCase[] => {
  return [
    {
      value: '',
      description: `should return an error if the ${field} is an empty string'`,
      errorMessageCheck,
    },
    {
      value: null,
      description: `should return an error if the ${field} is null`,
      errorMessageCheck,
    },
    {
      value: undefined,
      description: `should return an error if the ${field} is undefined`,
      errorMessageCheck,
    },
  ];
};
