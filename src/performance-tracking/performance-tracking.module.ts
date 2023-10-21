import { PerformanceTrackingService } from './performance-tracking.service';
import { Module } from '@nestjs/common';
import { PerformanceTrackingRepository } from './repository/repositories/performance-tracking.repository';
import { PerformanceTrackingResolver } from './performance-tracking.resolver';
import { PortfolioModule } from 'src/portfolio/portfolio.module';
import { TransactionModule } from 'src/transaction/transaction.module';
import { CryptoMarketDataModule } from 'src/crypto-market-data/crypto-market-data.module';

@Module({
  imports: [CryptoMarketDataModule, PortfolioModule, TransactionModule],
  providers: [
    PerformanceTrackingService,
    PerformanceTrackingRepository,
    PerformanceTrackingResolver,
  ],
})
export class PerformanceTrackingModule {}
