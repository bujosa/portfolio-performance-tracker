import { createMultipleHistoricalData } from './get-transactions-and-historical-data-objects.function';

describe('createMultipleHistoricalData', () => {
  it('should create an array of HistoricalDataMongooseObject with correct values', () => {
    const tokenPrice = {
      price: 100,
      percent_change_1h: 5,
      percent_change_24h: -2,
      percent_change_7d: 10,
      percent_change_30d: -3,
      percent_change_60d: 8,
      percent_change_90d: 15,
      market_cap: 1000000,
      last_updated: '2022-01-01T00:00:00.000Z',
      name: 'Bitcoin',
      symbol: 'BTC',
      volume_24h: 100000,
    };
    const result = createMultipleHistoricalData(tokenPrice);
    expect(result).toHaveLength(6);
    expect(result[0]).toMatchObject({
      open: 95,
      high: 95,
      low: 95,
      close: 95,
      marketCap: 950000,
      cryptoName: 'Bitcoin',
      version: 0,
    });
    expect(result[1]).toMatchObject({
      open: 102,
      high: 102,
      low: 102,
      close: 102,
      marketCap: 1020000,
      cryptoName: 'Bitcoin',
      version: 0,
    });
    expect(result[2]).toMatchObject({
      open: 89.99999999999999,
      high: 89.99999999999999,
      low: 89.99999999999999,
      close: 89.99999999999999,
      marketCap: 900000,
      cryptoName: 'Bitcoin',
      version: 0,
    });
    expect(result[3]).toMatchObject({
      open: 103,
      high: 103,
      low: 103,
      close: 103,
      marketCap: 1030000,
      cryptoName: 'Bitcoin',
      version: 0,
    });
    expect(result[4]).toMatchObject({
      open: 92,
      high: 92,
      low: 92,
      close: 92,
      marketCap: 920000,
      cryptoName: 'Bitcoin',
      version: 0,
    });
    expect(result[5]).toMatchObject({
      open: 85.00000000000001,
      high: 85.00000000000001,
      low: 85.00000000000001,
      close: 85.00000000000001,
      marketCap: 850000,
      cryptoName: 'Bitcoin',
      version: 0,
    });
  });
});
