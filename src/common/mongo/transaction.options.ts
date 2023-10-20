import { ClientSessionOptions } from 'mongodb';

export const transactionDefaultOptions: ClientSessionOptions = {
  defaultTransactionOptions: {
    maxTimeMS: 7000,
  },
};
