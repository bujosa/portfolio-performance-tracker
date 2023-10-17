import { MissingRequiredParametersError } from 'src/common/errors/missing-required-parameters.error';

export const getCollectionName = (
  fieldName: string,
  collectionMap: Record<string, string> = {},
): string => {
  if (!fieldName) {
    throw new MissingRequiredParametersError('getCollectionName');
  }

  const collectionName = collectionMap[fieldName];
  if (!collectionName) {
    return fieldName;
  }
  return collectionName;
};
