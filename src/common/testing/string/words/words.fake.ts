import { faker } from '@faker-js/faker';

/**
 * @description This function is for generating fake words using faker library
 * @returns
 */
export const generateFakeWords = (
  options: { length?: number } = {},
): string => {
  const { length = 3 } = options;

  return faker.lorem.words(length);
};
