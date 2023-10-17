/**
 * @description: Convert timestamp to datetime format
 * @param timestamp // 1619433600
 * @returns
 */
export const timestampConvertToDatetime = (timestamp) => {
  return new Date(timestamp * 1000);
};
