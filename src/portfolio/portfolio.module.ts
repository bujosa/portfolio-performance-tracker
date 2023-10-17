import { MongooseModule } from '@nestjs/mongoose';
import { PortfolioService } from './portfolio.service';
import { Module } from '@nestjs/common';
import { Portfolio, PortfolioSchema } from './repository/entities';
import { PortfolioRepository } from './repository/repositories/portfolio.repository';
import { PortfolioResolver } from './portfolio.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Portfolio.name,
        schema: PortfolioSchema,
      },
    ]),
  ],
  providers: [PortfolioService, PortfolioRepository, PortfolioResolver],
  exports: [MongooseModule],
})
export class PortforlioModule {}
