import { Types } from 'mongoose';
import { TransactionByAmountBasedInput } from '../graphql/inputs';
import { getTokensPrices } from 'src/asset/shared/get_prices';
import { generateISODate } from 'src/common/functions/generate-iso-date-string.util';

/**
 * @description Extracts prices for the market data of the tokens in the
 * transactions and creates the transactions and historical data objects
 * @param transactions {@link TransactionByAmountBasedInput}
 * @param portfolioId {@link Types.ObjectId}
 * @param apiKey string
 */
export const getTransactionsAndHistoricalDataObjects = async (
  transactions: TransactionByAmountBasedInput[],
  portfolioId: Types.ObjectId,
  apiKey: string,
) => {
  const names = transactions.map((transaction) => transaction.asset);
  const tokensPriceData = await getTokensPrices(names, apiKey);

  const transactionsMongooseObject = [];

  for (const transaction of transactions) {
    const tokenPrice = tokensPriceData.find(
      (tokenPrice) => tokenPrice.symbol === transaction.asset,
    );

    const _id = new Types.ObjectId();

    if (tokenPrice) {
      transactionsMongooseObject.push({
        _id,
        id: _id.toHexString(),
        portfolio: portfolioId,
        asset: transaction.asset,
        quantity: transaction.amount,
        price: tokenPrice.price,
        version: 0,
        createdAt: generateISODate(),
        updatedAt: generateISODate(),
      });
    } else {
      console.error(`Token price not found for ${transaction.asset}`);
    }
  }
};

interface TransactionMongooseObject {
  _id: Types.ObjectId;
  id: string;
  portfolio: Types.ObjectId;
  asset: string;
  quantity: number;
  price: number;
  version: number;
  createdAt: string;
  updatedAt: string;
}

interface HistoricalDataMongooseObject {
  _id: Types.ObjectId;
  id: string;
  open: number;
  high: number;
  close: number;
  marketCap: number;
  timestamp: string;
  crypto_name: string;
  date: string;
  version: number;
  createdAt: string;
  updatedAt: string;
}
