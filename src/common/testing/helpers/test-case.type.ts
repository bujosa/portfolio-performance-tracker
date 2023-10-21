export type TestCase<T = any> = {
  value: T;
  description: string;
  errorMessageCheck?: string;
};
