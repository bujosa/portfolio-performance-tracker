import { CryptoAssetEnum } from 'src/performance-tracking/graphql/enums';
import { TransactionByAmountBasedInput } from './transaction-amount-based.input';

describe('TransactionByAmountBasedInput', () => {
  let input: TransactionByAmountBasedInput;

  beforeEach(() => {
    input = {
      asset: CryptoAssetEnum.SOLANA,
      amount: 0.2,
    };
  });

  it('should be defined', () => {
    expect(input).toBeDefined();
  });

  it('should have an asset property', () => {
    expect(input.asset).toBeDefined();
  });

  it('should have a valid asset property', () => {
    input.asset = CryptoAssetEnum.BITCOIN;
    expect(input.asset).toEqual(CryptoAssetEnum.BITCOIN);
  });

  it('should have an amount property', () => {
    expect(input.amount).toBeDefined();
  });

  it('should have a valid amount property', () => {
    input.amount = 0.5;
    expect(input.amount).toEqual(0.5);
  });

  it('should have a validation schema', () => {
    expect(TransactionByAmountBasedInput.validationSchema).toBeDefined();
  });
});
