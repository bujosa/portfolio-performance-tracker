import { MissingRequiredParametersError } from 'src/common/errors/missing-required-parameters.error';
import { IBuildLookupStageInput } from 'src/common/graphql/advance-filter/interfaces/build-lookup-stage-input.inteface';
import { buildLookupStage } from './build-lookup-stage.util';
import { faker } from '@faker-js/faker';

describe('BuildLookupStage', () => {
  it('should throw an error if the collection option is null', () => {
    // arrange
    const input: IBuildLookupStageInput = {
      collection: null,
      localField: faker.string.alpha(),
      outputField: faker.string.alpha(),
    };

    // act & assert
    expect(() => buildLookupStage(input)).toThrow(
      MissingRequiredParametersError,
    );
  });

  it('should throw an error if the collection option is undefined', () => {
    // arrange
    const input: IBuildLookupStageInput = {
      collection: undefined,
      localField: faker.string.alpha(),
      outputField: faker.string.alpha(),
    };

    // act & assert
    expect(() => buildLookupStage(input)).toThrow(
      MissingRequiredParametersError,
    );
  });

  it('should throw an error if the collection option is empty', () => {
    // arrange
    const input: IBuildLookupStageInput = {
      collection: '',
      localField: faker.string.alpha(),
      outputField: faker.string.alpha(),
    };

    // act & assert
    expect(() => buildLookupStage(input)).toThrow(
      MissingRequiredParametersError,
    );
  });

  it('should throw an error if the localField option is null', () => {
    // arrange
    const input: IBuildLookupStageInput = {
      collection: faker.string.alpha(),
      localField: null,
      outputField: faker.string.alpha(),
    };

    // act & assert
    expect(() => buildLookupStage(input)).toThrow(
      MissingRequiredParametersError,
    );
  });

  it('should throw an error if the localField option is undefined', () => {
    // arrange
    const input: IBuildLookupStageInput = {
      collection: faker.string.alpha(),
      localField: undefined,
      outputField: faker.string.alpha(),
    };

    // act & assert
    expect(() => buildLookupStage(input)).toThrow(
      MissingRequiredParametersError,
    );
  });

  it('should throw an error if the localField option is empty', () => {
    // arrange
    const input: IBuildLookupStageInput = {
      collection: faker.string.alpha(),
      localField: '',
      outputField: faker.string.alpha(),
    };

    // act & assert
    expect(() => buildLookupStage(input)).toThrow(
      MissingRequiredParametersError,
    );
  });

  it('should throw an error if the outputField option is null', () => {
    // arrange
    const input: IBuildLookupStageInput = {
      collection: faker.string.alpha(),
      localField: faker.string.alpha(),
      outputField: null,
    };

    // act & assert
    expect(() => buildLookupStage(input)).toThrow(
      MissingRequiredParametersError,
    );
  });

  it('should throw an error if the outputField option is undefined', () => {
    // arrange
    const input: IBuildLookupStageInput = {
      collection: faker.string.alpha(),
      localField: faker.string.alpha(),
      outputField: undefined,
    };

    // act & assert
    expect(() => buildLookupStage(input)).toThrow(
      MissingRequiredParametersError,
    );
  });

  it('should throw an error if the outputField option is empty', () => {
    // arrange
    const input: IBuildLookupStageInput = {
      collection: faker.string.alpha(),
      localField: faker.string.alpha(),
      outputField: '',
    };

    // act & assert
    expect(() => buildLookupStage(input)).toThrow(
      MissingRequiredParametersError,
    );
  });

  it('should return a lookup stage', () => {
    // arrange
    const input: IBuildLookupStageInput = {
      collection: faker.string.alpha(),
      localField: faker.string.alpha(),
      outputField: faker.string.alpha(),
    };

    // act
    const expectedResult = buildLookupStage(input);

    // assert
    expect(expectedResult).toBeDefined();
  });
});
