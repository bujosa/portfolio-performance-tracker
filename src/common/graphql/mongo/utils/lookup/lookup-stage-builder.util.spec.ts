import { lookupStageBuilder } from './lookup-stage-builder.util';
import { faker } from '@faker-js/faker';
import { generateObjectId } from 'src/common/functions/generate-object-id.util';
import { GraphqlSortOperationEnum } from 'src/common/graphql/advance-filter/graphql-sort-operation.enum';

const lookupStageBuilderValidation = (
  filterOptions: Record<string, any>,
  sortOptions: Record<string, any>,
  expectedResult: any[],
) => {
  // act
  const res = lookupStageBuilder([], filterOptions, sortOptions);

  // assert
  expect(res).toEqual(expectedResult);
};

describe('LookupStageBuilder', () => {
  it('should return an empty array if both sortOptions and filterOptions are null', () => {
    // act
    const res = lookupStageBuilder([], null, null);

    // assert
    expect(res).toEqual([]);
  });

  it('should return an empty array if both sortOptions and filterOptions are undefined', () => {
    // act
    const res = lookupStageBuilder([], undefined, undefined);

    // assert
    expect(res).toEqual([]);
  });

  it('should return an empty array if both sortOptions and filterOptions are empty objects', () => {
    // act
    const res = lookupStageBuilder([], {}, {});

    // assert
    expect(res).toEqual([]);
  });

  const successCase1NotNested = () => {
    const filterOptions = {
      model: [generateObjectId(), generateObjectId()],
    };

    return [filterOptions, {}];
  };

  const successCase2NotNested = () => {
    const filterOptions = {
      model: [generateObjectId(), generateObjectId()],
    };

    const sortOptions = {
      model: GraphqlSortOperationEnum.asc,
    };

    return [filterOptions, sortOptions];
  };

  it.each([successCase1NotNested(), successCase2NotNested()])(
    'should return an empty array if both sortOptions and filterOptions do not contain nested objects',
    (filterOptions, sortOptions) => {
      // act
      const res = lookupStageBuilder([], filterOptions, sortOptions);

      // assert
      expect(res).toEqual([]);
    },
  );

  const successCase1Nested = () => {
    const filterOptions = {
      model: {
        name: 'Toyota',
      },
    };

    const expectedResult = [
      {
        $lookup: {
          from: 'model',
          localField: 'model',
          foreignField: '_id',
          as: 'model',
        },
      },
    ];

    return [filterOptions, {}, expectedResult];
  };

  const successCase2Nested = () => {
    const filterOptions = {
      model: [generateObjectId(), generateObjectId()],
    };

    const sortOptions = {
      model: {
        slug: GraphqlSortOperationEnum.asc,
      },
    };

    const expectedResult = [
      {
        $lookup: {
          from: 'model',
          localField: 'model',
          foreignField: '_id',
          as: 'model',
        },
      },
    ];

    return [filterOptions, sortOptions, expectedResult];
  };

  it.each([successCase1Nested(), successCase2Nested()])(
    'should return an empty array if sortOptions or filterOptions contains nested objects',
    lookupStageBuilderValidation,
  );

  const successCaseBothNested = () => {
    const filterOptions = {
      brand: {
        name: 'Toyota',
      },
    };

    const sortOptions = {
      model: {
        slug: GraphqlSortOperationEnum.asc,
      },
    };

    const expectedResult = [
      {
        $lookup: {
          from: 'brand',
          localField: 'brand',
          foreignField: '_id',
          as: 'brand',
        },
      },
      {
        $lookup: {
          from: 'model',
          localField: 'model',
          foreignField: '_id',
          as: 'model',
        },
      },
    ];

    return [filterOptions, sortOptions, expectedResult];
  };

  it.each([successCaseBothNested()])(
    'should return an array of lookup stages if both sortOptions and filterOptions contain nested objects',
    lookupStageBuilderValidation,
  );

  const successCaseBothNestedWithSameKey = () => {
    const model = faker.vehicle.model();

    const filterOptions = {
      model: {
        slug_in: [model],
      },
    };

    const sortOptions = {
      model: {
        slug: GraphqlSortOperationEnum.asc,
      },
    };

    const expectedResult = [
      {
        $lookup: {
          from: 'model',
          localField: 'model',
          foreignField: '_id',
          as: 'model',
        },
      },
    ];

    return [filterOptions, sortOptions, expectedResult];
  };

  it.each([successCaseBothNestedWithSameKey()])(
    'should return an array of one lookup stage if sortOptions and filterOptions contain nested objects with the same keys',
    lookupStageBuilderValidation,
  );
});
