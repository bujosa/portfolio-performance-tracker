import { mongooseTestingModule } from 'src/common/testing/modules';

beforeAll(async () => {
  await mongooseTestingModule.init();
});

afterEach(() => {
  jest.clearAllMocks();
});

afterAll(async () => {
  await mongooseTestingModule.closeConnection();
});
