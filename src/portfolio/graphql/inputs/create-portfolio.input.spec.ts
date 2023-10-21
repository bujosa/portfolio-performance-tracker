import { ValidationError } from 'joi';
import {
  generateFakeParagraphs,
  generateFakeWord,
} from 'src/common/testing/string';
import { generateCommonEmptyTestCases } from 'src/common/testing/helpers/generate-common-empty-tests-cases';
import { TestCase } from 'src/common/testing/helpers/test-case.type';
import { formatTestCase } from 'src/common/testing/helpers/generate-test-cases.function';
import { CreatePortfolioInput as CreateEntityInput } from './create-portfolio.input';
import { generateValidInputTest } from 'src/common/testing/helpers/generate-valid-input-test';

describe(CreateEntityInput.name, () => {
  const createEntityInput: CreateEntityInput = {
    name: generateFakeWord(),
  };

  describe('Valid inputs', () => {
    it('should successfully validate the input', () => {
      generateValidInputTest(createEntityInput, CreateEntityInput);
    });
  });

  describe('Invalid inputs', () => {
    const testCases: Record<keyof CreateEntityInput, TestCase[]> = {
      name: [
        ...generateCommonEmptyTestCases('name'),
        {
          description:
            'should throw an error if the name field is a string longer than 50 characters',
          value: generateFakeParagraphs(),
        },
      ],
    };

    describe.each(formatTestCase(testCases))(
      '%s',
      (field: string, cases: [string, any, string]) => {
        it.each(cases)('%s', (_, value, errorMessageCheck = field) => {
          // Arrange
          const input: CreateEntityInput = {
            ...createEntityInput,
            [field]: value,
          };

          // Act
          const { error } = CreateEntityInput.validationSchema.validate(input);

          // Assert
          expect(error.isJoi).toBeTruthy();
          expect(error).toBeInstanceOf(ValidationError);
          expect(error.message).toContain(errorMessageCheck);
        });
      },
    );
  });
});
