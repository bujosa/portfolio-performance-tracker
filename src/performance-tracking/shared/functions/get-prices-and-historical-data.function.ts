import {
  CoinMarketCapQuoteUSDWithName,
  getTokensPrices,
} from 'src/asset/shared/get-tokens-prices.function';
import { HistoricalDataMongooseObject } from 'src/crypto-market-data/shared/historical-data.type';
import { createMultipleHistoricalData } from 'src/portfolio';

/**
 * @description Extracts prices for the market data of the tokens and generates the historical data objects
 * @param assets string[] - The assets to get the prices for
 * @param apiKey string
 */
export async function getPricesAndHistoricalData(
  assets: string[],
  apiKey: string,
): Promise<PriceAndHistoricalData> {
  const tokensPriceData = await getTokensPrices(assets, apiKey);

  let historicalMarketDataObject: HistoricalDataMongooseObject[] = [];

  for (const tokenPrice of tokensPriceData) {
    const historicalMarketDatas = createMultipleHistoricalData(tokenPrice);

    historicalMarketDataObject = historicalMarketDataObject.concat(
      historicalMarketDatas,
    );
  }

  return new PriceAndHistoricalData(
    tokensPriceData,
    historicalMarketDataObject,
  );
}

export class PriceAndHistoricalData {
  priceData: CoinMarketCapQuoteUSDWithName[];
  historicalData: HistoricalDataMongooseObject[];

  constructor(
    public readonly _priceData: CoinMarketCapQuoteUSDWithName[],
    public readonly _historicalData: HistoricalDataMongooseObject[],
  ) {
    this.priceData = _priceData;
    this.historicalData = _historicalData;
  }
}
