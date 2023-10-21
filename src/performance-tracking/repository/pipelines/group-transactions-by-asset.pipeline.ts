import { hexStringToObjectId } from 'src/common/functions/hex-string-to-object-id';

type GroupTransactionsByAsset = {
  portfolio: string;
};

/**
 * @description This pipeline groups transactions by asset
 * @param options - The options for the pipeline
 * @returns
 */
export const groupTransactionsByAssetPipeline = (
  options: GroupTransactionsByAsset,
) => {
  return [
    {
      $match: { portfolio: hexStringToObjectId(options.portfolio) },
    },
    {
      $group: {
        _id: '$asset',
        quantity: {
          $sum: '$quantity',
        },
        totalSpent: {
          $sum: {
            $multiply: ['$price', '$quantity'],
          },
        },
      },
    },
    {
      $addFields: {
        asset: '$_id',
      },
    },
  ];
};
