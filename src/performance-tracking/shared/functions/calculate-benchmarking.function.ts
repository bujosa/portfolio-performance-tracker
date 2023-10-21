import { IAssetChangeValue } from '../interfaces/asset-change-value.interface';
import { PriceAndHistoricalData } from './get-prices-and-historical-data.function';
import { IGroupTransactionsByAsset } from '../interfaces/group-transactions-by-asset.interface';
import { ICalculateBenchmarking } from '../interfaces/benchmarking.interface';

export function calculateBenchmarking(
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

  const portfolioChange = {
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
    const meanPrice =
      transactionGroupByAsset.totalSpent / transactionGroupByAsset.quantity;

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
          ? 1
          : -1;
      });

    temporalBenchmarking.push({
      asset: transactionGroupByAsset.asset,
      totalSpent: transactionGroupByAsset.totalSpent,
      meanPrice,
      currentPrice,
      currentPercentage: (currentPrice - meanPrice) / currentPrice,
      changeOneHour:
        (selectHistoricalData[0].close - meanPrice) /
        selectHistoricalData[0].close,
      changeOneDay:
        (selectHistoricalData[1].close - meanPrice) /
        selectHistoricalData[1].close,
      changeOneWeek:
        (selectHistoricalData[2].close - meanPrice) /
        selectHistoricalData[2].close,
      changeOneMonth:
        (selectHistoricalData[3].close - meanPrice) /
        selectHistoricalData[3].close,
      changeTwoMonths:
        (selectHistoricalData[4].close - meanPrice) /
        selectHistoricalData[4].close,
      changeThreeMonths:
        (selectHistoricalData[5].close - meanPrice) /
        selectHistoricalData[5].close,
    });
  }

  // Calculate the change for the portfolio
  for (const temporalBenchmarkingItem of temporalBenchmarking) {
    portfolioChange.currentBudget +=
      temporalBenchmarkingItem.currentPrice *
      temporalBenchmarkingItem.totalSpent;
    portfolioChange.currentPercentage += calculateCurrentChange(
      totalSpent,
      temporalBenchmarkingItem,
      portfolioChange.currentPercentage,
    );
    portfolioChange.changeOneHour += calculateCurrentChange(
      totalSpent,
      temporalBenchmarkingItem,
      portfolioChange.changeOneHour,
    );
    portfolioChange.changeOneDay += calculateCurrentChange(
      totalSpent,
      temporalBenchmarkingItem,
      portfolioChange.changeOneDay,
    );
    portfolioChange.changeOneWeek += calculateCurrentChange(
      totalSpent,
      temporalBenchmarkingItem,
      portfolioChange.changeOneWeek,
    );
    portfolioChange.changeOneMonth += calculateCurrentChange(
      totalSpent,
      temporalBenchmarkingItem,
      portfolioChange.changeOneMonth,
    );
    portfolioChange.changeTwoMonths += calculateCurrentChange(
      totalSpent,
      temporalBenchmarkingItem,
      portfolioChange.changeTwoMonths,
    );
    portfolioChange.changeThreeMonths += calculateCurrentChange(
      totalSpent,
      temporalBenchmarkingItem,
      portfolioChange.changeThreeMonths,
    );
  }

  const benchmarking: ICalculateBenchmarking = {
    portfolio: {
      id: 'portfolio',
      totalSpent: portfolioChange.totalSpent,
      currentBudget: portfolioChange.currentBudget,
      changeOneHour: portfolioChange.changeOneHour,
      changeOneDay: portfolioChange.changeOneDay,
      changeOneWeek: portfolioChange.changeOneWeek,
      changeOneMonth: portfolioChange.changeOneMonth,
      changeTwoMonths: portfolioChange.changeTwoMonths,
      changeThreeMonths: portfolioChange.changeThreeMonths,
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

function calculateCurrentChange(
  globalTotalSpent: number,
  currentAsset: IAssetChangeValue,
  currentChange: number,
): number {
  const { totalSpent, currentPercentage } = currentAsset;
  return (totalSpent / globalTotalSpent) * currentPercentage + currentChange;
}
