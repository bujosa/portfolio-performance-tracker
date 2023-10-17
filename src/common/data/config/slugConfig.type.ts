/**
 * @description
 * Slug config type is for the slugify function to know which keys to use to create the slug
 * and if the slug should be unique or not.
 */
export type slugConfigType = {
  keys: string[];
  isUnique: boolean;
};
