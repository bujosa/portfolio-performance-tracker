export interface ICalculateBenchmarking {
  portfolio: {
    id: string;
    totalSpent: number;
    currentBudget: number;
    changeOneHour: number;
    changeOneDay: number;
    changeOneWeek: number;
    changeOneMonth: number;
    changeTwoMonths: number;
    changeThreeMonths: number;
  };
  asset: {
    name: string;
    currentPrice: number;
    changeOneHour: number;
    changeOneDay: number;
    changeOneWeek: number;
    changeOneMonth: number;
    changeTwoMonths: number;
    changeThreeMonths: number;
  };
}
