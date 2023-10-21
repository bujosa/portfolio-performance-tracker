import { generateId } from 'src/common/functions/generate-id.util';
import { PortfolioService } from './portfolio.service';
import { Portfolio } from './repository/entities';
import {
  CreatePortfolioInput,
  CreatePortfolioWithAmountBasedInput,
  CreatePortfolioWithWeightBasedInput,
  UpdatePortfolioInput,
} from './graphql/inputs';
import { generateFakeWord } from 'src/common/testing/string';
import { CommonServiceTests } from 'src/common/testing/helpers/common-service-tests';
import { PortfolioRepository } from './repository/repositories/portfolio.repository';
import { initializeCommonServiceTests } from 'src/common/testing/helpers/initialize-common-service-tests.function';
import { CryptoAssetEnum } from 'src/performance-tracking/graphql/enums';

describe(PortfolioService.name, () => {
  let commonServiceTests: CommonServiceTests;
  let entityService: PortfolioService;
  let entityRepository: PortfolioRepository;

  const entityName = Portfolio.name;

  const createEntityInput: CreatePortfolioInput = {
    name: generateFakeWord(),
  };

  const updateEntityInput: UpdatePortfolioInput = {
    where: { id: generateId() },
    data: {
      name: generateFakeWord(),
    },
  };

  const customRepository = {
    getOneEntity: jest.fn(),
    getAllEntities: jest.fn(),
    listEntities: jest.fn(),
    createEntity: jest.fn(),
    updateEntity: jest.fn(),
    deleteEntity: jest.fn(),
    createEntityWithAmountBased: jest.fn(),
    createEntityWithWeightBased: jest.fn(),
  };

  beforeAll(async () => {
    const config = await initializeCommonServiceTests({
      EntityService: PortfolioService,
      EntityRepository: PortfolioRepository,
      customRepository,
    });
    commonServiceTests = config.commonServiceTests;
    entityService = commonServiceTests.entityService;
    entityRepository = commonServiceTests.entityRepository;
  });

  describe(`getOne${entityName}`, () => {
    it(`should call the getOneEntity method of the ${entityName}Repository`, async () => {
      await commonServiceTests.getOneEntity();
    });
  });

  describe(`get${entityName}s`, () => {
    it(`should call the getAllEntities method of the ${entityName}Repository`, async () => {
      await commonServiceTests.getEntities();
    });
  });

  describe(`create${entityName}`, () => {
    it(`should call the createEntity method of the ${entityName}Repository`, async () => {
      await commonServiceTests.createEntity(createEntityInput);
    });
  });

  describe(`update${entityName}`, () => {
    it(`should call the updateEntity method of the ${entityName}Repository`, async () => {
      await entityService.updateEntity(updateEntityInput);

      expect(entityRepository.updateEntity).toHaveBeenCalled();
      expect(entityRepository.updateEntity).toHaveBeenCalledWith(
        updateEntityInput,
      );
    });
  });

  describe(`delete${entityName}`, () => {
    it(`should call the deleteEntity method of the ${entityName}Repository`, async () => {
      const id = generateId();

      await entityService.deleteEntity({ id });

      expect(entityRepository.deleteEntity).toHaveBeenCalled();
      expect(entityRepository.deleteEntity).toHaveBeenCalledWith({
        id,
      });
    });
  });

  // Custom methods tests
  describe(PortfolioService.prototype.createEntityWithAmountBased.name, () => {
    it(`should call the createEntityWithAmountBased method of the ${entityName}Repository`, async () => {
      // Arrange
      const createPortfolioWithAmountBasedInput: CreatePortfolioWithAmountBasedInput =
        {
          name: generateFakeWord(),
          transactions: [
            {
              amount: 5,
              asset: CryptoAssetEnum.SOLANA,
            },
            {
              amount: 1,
              asset: CryptoAssetEnum.BITCOIN,
            },
          ],
        };

      // Act
      await entityService.createEntityWithAmountBased(
        createPortfolioWithAmountBasedInput,
      );

      // Assert
      expect(entityRepository.createEntityWithAmountBased).toHaveBeenCalled();
      expect(entityRepository.createEntityWithAmountBased).toHaveBeenCalledWith(
        createPortfolioWithAmountBasedInput,
      );
    });
  });

  describe(PortfolioService.prototype.createEntityWithWeightBased.name, () => {
    it(`should call the createEntityWithWeightBased method of the ${entityName}Repository`, async () => {
      // Arrange
      const createPortfolioWithWeightBasedInput: CreatePortfolioWithWeightBasedInput =
        {
          name: generateFakeWord(),
          transactions: [
            {
              weight: 50,
              asset: CryptoAssetEnum.SOLANA,
            },
            {
              weight: 50,
              asset: CryptoAssetEnum.BITCOIN,
            },
          ],
          budget: 1000,
        };

      // Act
      await entityService.createEntityWithWeightBased(
        createPortfolioWithWeightBasedInput,
      );

      // Assert
      expect(entityRepository.createEntityWithWeightBased).toHaveBeenCalled();
      expect(entityRepository.createEntityWithWeightBased).toHaveBeenCalledWith(
        createPortfolioWithWeightBasedInput,
      );
    });
  });
});
