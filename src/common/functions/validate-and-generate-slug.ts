import { Model } from 'mongoose';
import { InvalidSlugConfigException } from '../errors/errors';
import { generateSlug } from './generate-slug';
import { slugConfigType } from '../data/config/slugConfig.type';

/**
 * @description
 * Validates the slug config and generates a slug if it is not provided
 * @param entityModel  The entity model
 * @param slugConfig  The slug config
 * @param input The input data
 * @returns
 */
export const validateAndGenerateSlug = (
  entityModel: Model<any>,
  slugConfig: slugConfigType,
  input: any,
) => {
  if (input.slug) return input.slug;

  const entityProperties = Object.keys(entityModel.schema.paths);
  let slug = undefined;

  if (entityModel.schema.paths.slug) {
    if (!slugConfig.keys.every((key) => entityProperties.includes(key))) {
      throw new InvalidSlugConfigException();
    }
    const slugValues = slugConfig.keys.map((key) => input[key]);
    slug = generateSlug(slugValues, slugConfig.isUnique);
  }

  return slug;
};
