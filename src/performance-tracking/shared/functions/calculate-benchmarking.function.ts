import { IAssetChangeValue } from '../interfaces/asset-change-value.interface';
import { PriceAndHistoricalData } from './get-prices-and-historical-data.function';
import { IGroupTransactionsByAsset } from '../interfaces/group-transactions-by-asset.interface';
import { ICalculateBenchmarking } from '../interfaces/benchmarking.interface';

export function calculateBenchmarking(
  portfolio: string,
  transactionsGroupByAsset: IGroupTransactionsByAsset[],
  asset: string,
  priceAndHistoricalData: PriceAndHistoricalData,
): ICalculateBenchmarking {
  const priceData = priceAndHistoricalData.priceData.find((priceData) => {
    return priceData.name === asset;
  });
  const changeAsset = {
    asset,
    currentPrice: priceData.price,
    currentPercentage: 0,
    changeOneHour: priceData.percent_change_1h,
    changeOneDay: priceData.percent_change_24h,
    changeOneWeek: priceData.percent_change_7d,
    changeOneMonth: priceData.percent_change_30d,
    changeTwoMonths: priceData.percent_change_60d,
    changeThreeMonths: priceData.percent_change_90d,
  };

  const totalSpent = transactionsGroupByAsset.reduce((acc, transaction) => {
    return acc + transaction.totalSpent;
  }, 0);

  let portfolioChange = {
    totalSpent,
    currentBudget: 0,
    currentPercentage: 0,
    changeOneHour: 0,
    changeOneDay: 0,
    changeOneWeek: 0,
    changeOneMonth: 0,
    changeTwoMonths: 0,
    changeThreeMonths: 0,
  };

  const temporalBenchmarking: IAssetChangeValue[] = [];
  for (const transactionGroupByAsset of transactionsGroupByAsset) {
    const currentPrice = priceAndHistoricalData.priceData.find(
      (priceData) => priceData.name === transactionGroupByAsset.asset,
    ).price;

    const selectHistoricalData = priceAndHistoricalData.historicalData
      .filter(
        (historicalData) =>
          historicalData.cryptoName === transactionGroupByAsset.asset,
      )
      .sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime() > 0
          ? -1
          : 1;
      });

    temporalBenchmarking.push({
      asset: transactionGroupByAsset.asset,
      totalSpent: transactionGroupByAsset.totalSpent,
      quantity: transactionGroupByAsset.quantity,
      currentPrice,
      changeOneHour: selectHistoricalData[0].close,
      changeOneDay: selectHistoricalData[1].close,
      changeOneWeek: selectHistoricalData[2].close,
      changeOneMonth: selectHistoricalData[3].close,
      changeTwoMonths: selectHistoricalData[4].close,
      changeThreeMonths: selectHistoricalData[5].close,
    });
  }

  portfolioChange.currentBudget = temporalBenchmarking.reduce((acc, item) => {
    return acc + item.currentPrice * item.quantity;
  }, 0);

  portfolioChange = temporalBenchmarking.reduce((acc, item) => {
    return {
      ...acc,
      changeOneHour: acc.changeOneHour + item.changeOneHour * item.quantity,
      changeOneDay: acc.changeOneDay + item.changeOneDay * item.quantity,
      changeOneWeek: acc.changeOneWeek + item.changeOneWeek * item.quantity,
      changeOneMonth: acc.changeOneMonth + item.changeOneMonth * item.quantity,
      changeTwoMonths:
        acc.changeTwoMonths + item.changeTwoMonths * item.quantity,
      changeThreeMonths:
        acc.changeThreeMonths + item.changeThreeMonths * item.quantity,
    };
  }, portfolioChange);

  const benchmarking: ICalculateBenchmarking = {
    portfolio: {
      id: portfolio,
      totalSpent: portfolioChange.totalSpent,
      currentBudget: portfolioChange.currentBudget,
      changeOneHour:
        portfolioChange.currentBudget / portfolioChange.changeOneHour - 1,
      changeOneDay:
        portfolioChange.currentBudget / portfolioChange.changeOneDay - 1,
      changeOneWeek:
        portfolioChange.currentBudget / portfolioChange.changeOneWeek - 1,
      changeOneMonth:
        portfolioChange.currentBudget / portfolioChange.changeOneMonth - 1,
      changeTwoMonths:
        portfolioChange.currentBudget / portfolioChange.changeTwoMonths - 1,
      changeThreeMonths:
        portfolioChange.currentBudget / portfolioChange.changeThreeMonths - 1,
    },
    asset: {
      name: changeAsset.asset,
      currentPrice: changeAsset.currentPrice,
      changeOneHour: changeAsset.changeOneHour,
      changeOneDay: changeAsset.changeOneDay,
      changeOneWeek: changeAsset.changeOneWeek,
      changeOneMonth: changeAsset.changeOneMonth,
      changeTwoMonths: changeAsset.changeTwoMonths,
      changeThreeMonths: changeAsset.changeThreeMonths,
    },
  };

  return benchmarking;
}
