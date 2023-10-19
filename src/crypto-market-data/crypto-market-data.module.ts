import { MongooseModule } from '@nestjs/mongoose';
import { CryptoMarketDataService } from './crypto-market-data.service';
import { Module } from '@nestjs/common';
import {
  CryptoMarketData,
  CryptoMarketDataSchema,
} from './repository/entities';
import { CryptoMarketDataRepository } from './repository/repositories/crypto-market-data.repository';
import { CryptoMarketDataResolver } from './crypto-market-data.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CryptoMarketData.name,
        schema: CryptoMarketDataSchema,
      },
    ]),
  ],
  providers: [
    CryptoMarketDataService,
    CryptoMarketDataRepository,
    CryptoMarketDataResolver,
  ],
  exports: [MongooseModule, CryptoMarketDataRepository],
})
export class CryptoMarketDataModule {}
