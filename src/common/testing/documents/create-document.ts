import { generateISODate } from 'src/common/functions/generate-iso-date-string.util';
import { validateAndGenerateSlug } from '../../functions/validate-and-generate-slug';

export const createDocument =
  (entityModel, entityRepository, createEntityInput) => async () => {
    const slug = validateAndGenerateSlug(
      entityModel,
      entityRepository.slugConfig,
      createEntityInput,
    );

    const entity = new entityModel({
      ...createEntityInput,
      slug,
      updatedAt: generateISODate(),
      createdAt: generateISODate(),
    });

    await entity.save();

    let query = entityModel.findById(entity.id);

    if (entityModel.buildProjection) {
      query = entityModel.buildProjection(query);
    }

    return query;
  };
