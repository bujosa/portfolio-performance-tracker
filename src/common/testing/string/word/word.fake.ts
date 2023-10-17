import { faker } from '@faker-js/faker';

/**
 * @description This function is for generating fake word using faker library
 * @returns
 */
export const generateFakeWord = (options: { length?: number } = {}): string => {
  const { length = 5 } = options;

  return faker.lorem.word(length);
};
