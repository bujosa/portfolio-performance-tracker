import { InvalidLimitInputError } from 'src/common/errors/filters';

export const limitAggregationPipelineBuilder = (
  pipeline: any[],
  limit: number,
) => {
  if (!limit) {
    return pipeline;
  }

  if (!Number.isInteger(limit)) {
    throw new InvalidLimitInputError(limit);
  }

  const limitStage = {
    $limit: limit,
  };

  pipeline.push(limitStage);

  return pipeline;
};
