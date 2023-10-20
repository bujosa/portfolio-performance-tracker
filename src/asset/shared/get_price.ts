import axios from 'axios';

export async function getCoinPrice(symbol: string, apiKey: string) {
  let price = 0;

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
        price = cryptocurrency.quote.USD.price;
        console.log(`Price of ${symbol}: $${price}`);
      } else {
        console.error(`Cryptocurrency ${symbol} not found.`);
      }
    } else {
      console.error(`Failed to fetch data. Status code: ${response.status}`);
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
  } finally {
    return price;
  }
}
