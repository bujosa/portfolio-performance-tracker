import { isObject } from '../is-object.util';
import { faker } from '@faker-js/faker';

describe('isObject', () => {
  it('should return false if the input is null', () => {
    // arrange & act
    const res = isObject(null);

    // assert
    expect(res).toEqual(false);
  });

  it('should return false if the input is undefined', () => {
    // arrange & act
    const res = isObject(undefined);

    // assert
    expect(res).toEqual(false);
  });

  it.each([[faker.lorem.word(5)], [false], [true], [12453]])(
    'should return false if the given input is a primitive type = "%s"',
    (input) => {
      // arrange & act
      const res = isObject(input);

      // assert
      expect(res).toEqual(false);
    },
  );

  // Array case
  it.each([
    [{ name: faker.lorem.word(5) }],
    [{ layer1: { layer2: faker.lorem.word(5) } }],
  ])('should return true if the given input is an object = "%s"', (input) => {
    // arrange & act
    const res = isObject(input);

    // assert
    expect(res).toEqual(true);
  });
});
