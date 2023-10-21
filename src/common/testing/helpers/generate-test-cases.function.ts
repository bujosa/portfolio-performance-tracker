import { TestCase } from './test-case.type';

export const formatTestCase = (testCases: Record<string, TestCase[]>) => {
  const keys = Object.keys(testCases);

  const testCaseKeys = keys.filter((key) => testCases[key].length > 0);

  return testCaseKeys.map((key) => [key, generateTestCases(testCases[key])]);
};

export const generateTestCases = (rawTestCases: TestCase[]) => {
  return rawTestCases.map((testCase) => [
    testCase.description,
    testCase.value,
    testCase.errorMessageCheck,
  ]);
};
