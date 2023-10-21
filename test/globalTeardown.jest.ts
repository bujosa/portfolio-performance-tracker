import { MongoMemoryReplSet } from 'mongodb-memory-server';

export = async function globalTeardown() {
  const instance: MongoMemoryReplSet = (global as any)._MONGOINSTANCE;

  await instance.stop();
};
