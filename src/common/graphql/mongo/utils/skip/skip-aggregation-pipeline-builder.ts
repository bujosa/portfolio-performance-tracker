import { InvalidStartInputError } from 'src/common/errors/filters';

export const skipAggregationPipelineBuilder = (
  pipeline: any[],
  skip: number,
) => {
  if (!Number.isInteger(skip)) {
    throw new InvalidStartInputError(skip);
  }

  const skipStage = {
    $skip: skip,
  };

  pipeline.push(skipStage);

  return pipeline;
};
