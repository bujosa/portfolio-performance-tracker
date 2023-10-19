import { registerEnumType } from '@nestjs/graphql';

export enum CryptoAssetEnum {
  BITCOIN = 'Bitcoin',
  LITECOIN = 'Litecoin',
  RIPPLE = 'Ripple',
  DOGECOIN = 'Dogecoin',
  MONERO = 'Monero',
  STELLAR = 'Stellar',
  TETHER = 'Tether',
  ETHEREUM = 'Ethereum',
  ETHEREUM_CLASSIC = 'Ethereum Classic',
  MAKER = 'Maker',
  BASIC_ATTENTION_TOKEN = 'Basic Attention Token',
  EOS = 'EOS',
  BITCOIN_CASH = 'Bitcoin Cash',
  BNB = 'BNB',
  TRON = 'TRON',
  DECENTRALAND = 'Decentraland',
  CHAINLINK = 'Chainlink',
  CARDANO = 'Cardano',
  FILECOIN = 'Filecoin',
  THETA_NETWORK = 'Theta Network',
  HUOBI_TOKEN = 'Huobi Token',
  RAVENCOIN = 'Ravencoin',
  TEZOS = 'Tezos',
  VECHAIN = 'VeChain',
  QUANT = 'Quant',
  USD_COIN = 'USD Coin',
  CRONOS = 'Cronos',
  WRAPPED_BITCOIN = 'Wrapped Bitcoin',
  COSMOS = 'Cosmos',
  POLYGON = 'Polygon',
  OKB = 'OKB',
  UNUS_SED_LEO = 'UNUS SED LEO',
  ALGORAND = 'Algorand',
  CHILIZ = 'Chiliz',
  THORCHAIN = 'THORChain',
  TERRA_CLASSIC = 'Terra Classic',
  FTX_TOKEN = 'FTX Token',
  HEDERA = 'Hedera',
  BINANCE_USD = 'Binance USD',
  DAI = 'Dai',
  SOLANA = 'Solana',
  AVALANCHE = 'Avalanche',
  SHIBA_INU = 'Shiba Inu',
  THE_SANDBOX = 'The Sandbox',
  POLKADOT = 'Polkadot',
  ELROND = 'Elrond',
  UNISWAP = 'Uniswap',
  AAVE = 'Aave',
  NEAR_PROTOCOL = 'NEAR Protocol',
  FLOW = 'Flow',
  INTERNET_COMPUTER = 'Internet Computer',
  CASPER = 'Casper',
  TONCOIN = 'Toncoin',
  CHAIN = 'Chain',
  APECOIN = 'ApeCoin',
  APTOS = 'Aptos',
}

registerEnumType(CryptoAssetEnum, {
  name: 'CryptoAssetEnum',
  description:
    'Crypto asset enum represent the crypto assets available in the app',
});