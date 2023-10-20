import { MissingRequiredParametersError } from 'src/common/errors/missing-required-parameters.error';
import { getCollectionName } from '../../common/get-collection-name.util';
import { faker } from '@faker-js/faker';

describe('GetCollectionName', () => {
  it('should throw an error if the fieldName parameter is null', () => {
    // arrange & act & assert
    expect(() => getCollectionName(null)).toThrow(
      MissingRequiredParametersError,
    );
  });

  it('should throw an error if the fieldName parameter is undefined', () => {
    // arrange & act & assert
    expect(() => getCollectionName(undefined)).toThrow(
      MissingRequiredParametersError,
    );
  });

  it('should throw an error if the fieldName paramter is empty', () => {
    // arrange & act & assert
    expect(() => getCollectionName('')).toThrow(MissingRequiredParametersError);
  });

  it('should return the fieldName if the collectionMap is not provided', () => {
    // arrange
    const fieldName = faker.random.alpha();

    // act
    const res = getCollectionName(fieldName);

    // assert
    expect(res).toBe(fieldName);
  });

  it('should return the collectionName if the collectionMap is provided', () => {
    // arrange
    const fieldName = faker.random.alpha();
    const collectionName = faker.random.alpha();
    const collectionMap = {
      [fieldName]: collectionName,
    };

    // act
    const res = getCollectionName(fieldName, collectionMap);

    // assert
    expect(res).toBe(collectionName);
  });
});
