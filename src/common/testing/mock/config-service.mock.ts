import { faker } from '@faker-js/faker';

export const configServiceMock = {
  get: jest.fn().mockReturnValue(faker.lorem.word(11)),
};
