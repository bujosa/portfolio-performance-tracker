import axios from 'axios';

export async function getTokenPrice(
  symbol: string,
  apiKey: string,
): Promise<CoinMarketCapQuoteUSD> {
  let coinMarketCapQuoteUSD: CoinMarketCapQuoteUSD = {
    symbol: symbol,
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
  };

  try {
    const response = await axios.get(
      `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${symbol}`,
      {
        headers: {
          'X-CMC_PRO_API_KEY': apiKey,
        },
      },
    );
    if (response.status === 200) {
      const data = response.data;
      const cryptocurrency = data.data[symbol.toUpperCase()];
      if (cryptocurrency) {
        coinMarketCapQuoteUSD = cryptocurrency.quote.USD;
      } else {
        console.error(`Cryptocurrency ${symbol} not found.`);
      }
    } else {
      console.error(`Failed to fetch data. Status code: ${response.status}`);
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
  } finally {
    return coinMarketCapQuoteUSD;
  }
}

export class CoinMarketCapQuoteUSD {
  price: number;
  symbol: string;
  volume_24h: number;
  percent_change_1h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  percent_change_30d: number;
  percent_change_60d: number;
  percent_change_90d: number;
  market_cap: number;
  last_updated: string;
}
