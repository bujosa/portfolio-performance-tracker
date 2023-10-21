import { faker } from '@faker-js/faker';

/**
 * @description This function is for generating fake paragraphs using faker library
 * @returns
 */
export const generateFakeParagraphs = (
  options: { length?: number } = {},
): string => {
  const { length = 5 } = options;

  return faker.lorem.paragraphs(length);
};
