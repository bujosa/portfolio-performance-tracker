import { PerformanceTrackingService } from './performance-tracking.service';
import { Module } from '@nestjs/common';
import { PerformanceTrackingRepository } from './repository/repositories/performance-tracking.repository';
import { PerformanceTrackingResolver } from './performance-tracking.resolver';
import { PortfolioModule } from 'src/portfolio/portfolio.module';

@Module({
  imports: [PortfolioModule],
  providers: [
    PerformanceTrackingService,
    PerformanceTrackingRepository,
    PerformanceTrackingResolver,
  ],
})
export class PerformanceTrackingModule {}
