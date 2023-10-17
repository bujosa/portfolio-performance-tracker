import { MissingRequiredParametersError } from 'src/common/errors/missing-required-parameters.error';
import { IBuildLookupStageInput } from 'src/common/graphql/advance-filter/interfaces/build-lookup-stage-input.inteface';

const DEFAULT_LOOKUP_FIELD = '_id';

export const buildLookupStage = (options: IBuildLookupStageInput) => {
  const { collection, localField, outputField } = options;

  if (!collection || !localField || !outputField) {
    throw new MissingRequiredParametersError('buildLookupStage');
  }

  return {
    $lookup: {
      from: collection,
      localField: localField,
      foreignField: DEFAULT_LOOKUP_FIELD,
      as: outputField,
    },
  };
};
