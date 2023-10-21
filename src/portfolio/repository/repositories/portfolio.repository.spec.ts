import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { PortfolioRepository } from './portfolio.repository';
import { Portfolio, PortfolioSchema } from '../entities';
import { CommonRepositoryTests } from 'src/common/testing/helpers/common-repository-tests';
import {
  CreatePortfolioInput,
  UpdatePortfolioPayload,
} from 'src/portfolio/graphql/inputs';
import { generateFakeWord } from 'src/common/testing/string';
import { initializeCommonRepositoryTests } from 'src/common/testing/helpers/initialize-common-repository-tests.function';
import { configServiceMock } from 'src/common/testing/mock/config-service.mock';
import {
  CryptoMarketData,
  CryptoMarketDataSchema,
} from 'src/crypto-market-data/repository/entities';
import {
  Transaction,
  TransactionSchema,
} from 'src/transaction/repository/entities';
import { TransactionRepository } from 'src/transaction/repository/repositories/transaction.repository';

describe(PortfolioRepository.name, () => {
  let entityModel: Model<Portfolio>;
  let cryptoMarketDataModel: Model<CryptoMarketData>;
  let transactionModel: Model<Transaction>;
  let commonRepositoryTests: CommonRepositoryTests;

  const entityName = Portfolio.name;

  const createEntityInput: CreatePortfolioInput = {
    name: generateFakeWord({ length: 5 }),
  };

  const updateEntityPayload: UpdatePortfolioPayload = {
    name: generateFakeWord({ length: 6 }),
  };

  beforeAll(async () => {
    const config = await initializeCommonRepositoryTests({
      Entity: Portfolio,
      EntitySchema: PortfolioSchema,
      EntityRepository: PortfolioRepository,
      createEntityInput,
      providers: [
        {
          provide: ConfigService,
          useValue: configServiceMock,
        },
        TransactionRepository,
      ],
      mongooseModels: [
        {
          name: CryptoMarketData.name,
          schema: CryptoMarketDataSchema,
        },
        {
          name: Transaction.name,
          schema: TransactionSchema,
        },
      ],
    });

    transactionModel = config.mongooseTestModels[Transaction.name];
    cryptoMarketDataModel = config.mongooseTestModels[CryptoMarketData.name];

    entityModel = config.entityModel;
    commonRepositoryTests = config.commonRepositoryTests;
  });

  beforeEach(async () => {
    return Promise.all([
      entityModel.deleteMany({}),
      cryptoMarketDataModel.deleteMany({}),
      transactionModel.deleteMany({}),
    ]);
  });

  describe(`getOne${entityName}`, () => {
    it(`should throw an error if the given id does not match any existing ${entityName} entity`, async () => {
      await commonRepositoryTests.getOneEntityError();
    });

    it(`should return the entity if the given id match an existing ${entityName} entity`, async () => {
      await commonRepositoryTests.getOneEntityById();
    });
  });

  describe(`getAll${entityName}s`, () => {
    it(`should return an empty array if there are no ${entityName}s entities stored in the database`, async () => {
      await commonRepositoryTests.getAllEntitiesError();
    });

    it(`should return an array with one element if there is one ${entityName} entity stored in the database`, async () => {
      await commonRepositoryTests.getAllEntities();
    });
  });

  describe(`create${entityName}`, () => {
    it(`should create an ${entityName} entity given a valid input`, async () => {
      await commonRepositoryTests.createEntity();
    });
  });

  describe(`update${entityName}`, () => {
    it(`should throw an error if an id of a not existing ${entityName} entity is provided`, async () => {
      await commonRepositoryTests.updateEntityError(updateEntityPayload);
    });

    it(`should update the ${entityName} entity that match the given id, if valid fields are provided`, async () => {
      await commonRepositoryTests.updateEntity(updateEntityPayload);
    });
  });

  describe(`delete${entityName}`, () => {
    it(`should throw an error if an id of a non-existing ${entityName} entity is provided`, async () => {
      await commonRepositoryTests.deleteEntityError();
    });

    it(`should mark as deleted the ${entityName} entity that match with the given id`, async () => {
      await commonRepositoryTests.deleteEntity();
    });
  });
});
