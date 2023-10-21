import { EntityRepositoryTestType } from '../helpers/entity-repository-test.type';

export const entityRepository: EntityRepositoryTestType = {
  getOneEntity: jest.fn(),
  getAllEntities: jest.fn(),
  createEntity: jest.fn(),
  updateEntity: jest.fn(),
  deleteEntity: jest.fn(),
  getOneEntityByIdOrNull: jest.fn(),
};

export const getFakeEntityRepository = () => ({
  getOneEntity: jest.fn(),
  getAllEntities: jest.fn(),
  createEntity: jest.fn(),
  updateEntity: jest.fn(),
  deleteEntity: jest.fn(),
  getOneEntityByIdOrNull: jest.fn(),
});

export const fakeEntityRepository = {
  getOneEntity: jest.fn(),
  getAllEntities: jest.fn(),
  createEntity: jest.fn(),
  updateEntity: jest.fn(),
  deleteEntity: jest.fn(),
  getOneEntityByIdOrNull: jest.fn(),
};
