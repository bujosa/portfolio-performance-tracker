import axios from 'axios';
import { CoinMarketCapQuoteUSD } from './get-token-price.function';
import { getCryptoSymbol } from 'src/transaction/shared/get-crypto-symbol';
import { CryptoAssetEnum } from 'src/performance-tracking/graphql/enums/crypto-asset.enum';

export async function getTokensPrices(
  names: string[],
  apiKey: string,
): Promise<CoinMarketCapQuoteUSDWithName[]> {
  let tokensPricesData: CoinMarketCapQuoteUSDWithName[] = [];

  const symbols = [];

  for (const name of names) {
    const symbol = getCryptoSymbol(name as CryptoAssetEnum);
    if (symbol) {
      symbols.push(symbol);
    } else {
      console.error(`Symbol not found for ${name}`);
    }
  }

  const symbolString = symbols.join(',');

  try {
    const response = await axios.get(
      `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${symbolString}`,
      {
        headers: {
          'X-CMC_PRO_API_KEY': apiKey,
        },
      },
    );
    if (response.status === 200) {
      const data = response.data;

      for (const name of names) {
        const symbol = getCryptoSymbol(name as CryptoAssetEnum);
        const cryptocurrency = data.data[symbol.toUpperCase()];
        if (cryptocurrency) {
          const result = cryptocurrency.quote.USD;
          result.symbol = symbol;
          tokensPricesData.push(result);
        } else {
          tokensPricesData.push({
            name,
            symbol,
            price: 0,
            volume_24h: 0,
            percent_change_1h: 0,
            percent_change_24h: 0,
            percent_change_7d: 0,
            percent_change_30d: 0,
            percent_change_60d: 0,
            percent_change_90d: 0,
            market_cap: 0,
            last_updated: '',
          });
          console.error(`Cryptocurrency ${symbol} not found.`);
        }
      }
    } else {
      console.error(`Failed to fetch data. Status code: ${response.status}`);
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
  } finally {
    return tokensPricesData;
  }
}

export class CoinMarketCapQuoteUSDWithName extends CoinMarketCapQuoteUSD {
  name: string;
}
