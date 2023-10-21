import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { Model } from 'mongoose';
import { mongooseTestingModule } from '../modules/mongoose-module-testing.module';
import { CommonRepositoryTests } from './common-repository-tests';
import { RepositoryTestConfigType } from './repository-test-config.type';

export const initializeCommonRepositoryTests = async (
  config: RepositoryTestConfigType,
) => {
  const {
    EntityRepository,
    Entity,
    EntitySchema,
    createEntityInput,
    imports = [],
    providers = [],
    mongooseModels = [],
    createDocument,
  } = config;

  const testModule = await Test.createTestingModule({
    imports: [
      mongooseTestingModule.instance,
      MongooseModule.forFeature([
        {
          name: Entity.name,
          schema: EntitySchema,
        },
        ...mongooseModels,
      ]),
      ...imports,
    ],
    providers: [EntityRepository, ...providers],
  }).compile();

  const entityRepository =
    testModule.get<typeof EntityRepository>(EntityRepository);

  const entityModel = testModule.get<Model<typeof Entity>>(
    getModelToken(Entity.name),
  );

  await entityModel.createCollection();

  const mongooseTestModels: Record<string, Model<any>> = {};

  for (const mongooseModel of mongooseModels) {
    const model = testModule.get(getModelToken(mongooseModel.name));

    await model.createCollection();

    mongooseTestModels[mongooseModel.name] = model;
  }

  const commonRepositoryTests = new CommonRepositoryTests(
    entityRepository,
    entityModel,
    createEntityInput,
    createDocument,
  );

  return {
    entityModel,
    entityRepository,
    commonRepositoryTests,
    testModule,
    mongooseTestModels,
  };
};
