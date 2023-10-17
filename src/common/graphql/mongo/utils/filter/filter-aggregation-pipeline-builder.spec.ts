import { generateObjectId } from 'src/common/functions/generate-object-id.util';
import { generateFakeWord } from 'src/common/testing/string';
import { filterAggregationPipelineBuilder } from './filter-aggregation-pipeline-builder.util';
import { generateFakeSlug } from 'src/common/testing/slug';

const validationExpect = (input, expectedResult) => {
  // arrange & act
  const res = filterAggregationPipelineBuilder([], input);

  // assert
  expect(res).toEqual(expectedResult);
};

describe('FilterAggregationPipelineBuilder', () => {
  it('should return an empty array given an empty object', () => {
    // arrange & act
    const res = filterAggregationPipelineBuilder([], {});

    // assert
    expect(res).toEqual([]);
  });

  describe('No nested fields ', () => {
    it('should return the correct match stage given a filterInput without nested fields', () => {
      // Arrange
      const id = generateObjectId();

      const expectedResult = [
        {
          $match: {
            bodyStyle: { $eq: id },
          },
        },
      ];

      const filterOptions: Record<string, any> = {
        bodyStyle: id.toHexString(),
      };

      // Act
      const res = filterAggregationPipelineBuilder([], filterOptions);

      // Assert
      expect(res).toEqual(expectedResult);
    });

    const firstSuccessCaseWithArrays = () => {
      const id1 = generateObjectId();
      const id2 = generateObjectId();

      const expectedResult = [
        {
          $match: {
            bodyStyle: { $in: [id1, id2] },
          },
        },
      ];

      const input: Record<string, any> = {
        bodyStyle_in: [id1.toHexString(), id2.toHexString()],
      };

      return [input, expectedResult];
    };

    const secondSuccessCaseWithArrays = () => {
      const id1 = generateObjectId();
      const id2 = generateObjectId();

      const expectedResult = [
        {
          $match: {
            bodyStyle: { $in: [id1, id2] },
            year: { $gte: 2014, $lt: 2020 },
          },
        },
      ];

      const input: Record<string, any> = {
        bodyStyle_in: [id1.toHexString(), id2.toHexString()],
        year_gte: 2014,
        year_lt: 2020,
      };

      return [input, expectedResult];
    };

    it.each([firstSuccessCaseWithArrays(), secondSuccessCaseWithArrays()])(
      'should return the correct match stage given a filterInput without nested fields that has array values',
      validationExpect,
    );
  });

  describe('Nested fields', () => {
    const firstSuccessCase = () => {
      const categorySlug = generateFakeSlug();
      const expectedResult = [
        {
          $match: {
            'categories.slug': { $eq: categorySlug },
          },
        },
      ];

      const filterOptions: Record<string, any> = {
        categories: {
          slug: categorySlug,
        },
      };

      return [filterOptions, expectedResult];
    };

    const secondSuccessCase = () => {
      const categorySlug = generateFakeSlug();
      const categoryName = generateFakeWord();

      const expectedResult = [
        {
          $match: {
            'categories.slug': { $eq: categorySlug },
            'categories.name': { $eq: categoryName },
          },
        },
      ];

      const filterOptions: Record<string, any> = {
        categories: {
          slug: categorySlug,
          name: categoryName,
        },
      };

      return [filterOptions, expectedResult];
    };

    it.each([firstSuccessCase(), secondSuccessCase()])(
      'should return the correct match stage given a filterInput with nested fields',
      validationExpect,
    );
  });

  describe('Nested fields and non nested fields', () => {
    const firstSuccessCase = () => {
      const categorySlug = generateFakeSlug();
      const id1 = generateObjectId();
      const id2 = generateObjectId();

      const expectedResult = [
        {
          $match: {
            categories: { $in: [id1, id2] },
          },
        },
        {
          $match: {
            'categories.slug': { $eq: categorySlug },
          },
        },
      ];

      const filterOptions: Record<string, any> = {
        categories_in: [id1.toHexString(), id2.toHexString()],
        categories: {
          slug: categorySlug,
        },
      };

      return [filterOptions, expectedResult];
    };

    const secondSuccessCase = () => {
      const categorySlug = generateFakeSlug();
      const modelSlug = generateFakeSlug();
      const id1 = generateObjectId();
      const id2 = generateObjectId();
      const id3 = generateObjectId();
      const id4 = generateObjectId();

      const expectedResult = [
        {
          $match: {
            categories: { $in: [id1, id2] },
            brand: { $in: [id3, id4] },
          },
        },
        {
          $match: {
            'categories.slug': { $eq: categorySlug },
            'model.slug': { $eq: modelSlug },
          },
        },
      ];

      const filterOptions: Record<string, any> = {
        categories_in: [id1.toHexString(), id2.toHexString()],
        categories: {
          slug: categorySlug,
        },
        brand_in: [id3.toHexString(), id4.toHexString()],
        model: {
          slug: modelSlug,
        },
      };

      return [filterOptions, expectedResult];
    };

    it.each([firstSuccessCase(), secondSuccessCase()])(
      'should return the correct match stage given a filter input with both nested and non nested fields',
      validationExpect,
    );
  });
});
