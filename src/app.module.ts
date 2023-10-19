import { Module } from '@nestjs/common';
import { PortfolioModule } from './portfolio/portfolio.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { EnvKey } from './common/data/config/env-key.enum';
import { TransactionModule } from './transaction/transaction.module';
import { AssetModule } from './asset/asset.module';
import { gqlErrorFormatter } from './common/errors/utils/gql-error-formatter.util';
import { CryptoMarketDataModule } from './crypto-market-data/crypto-market-data.module';
import { PerformanceTrackingModule } from './performance-tracking/performance-tracking.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      imports: [],
      inject: [],
      driver: ApolloDriver,
      useFactory: () => {
        return {
          autoSchemaFile: true,
          formatError: gqlErrorFormatter,
        };
      },
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService): MongooseModuleOptions => {
        const dbUri = configService.get(EnvKey.MONGO_DB_URI);
        const dbName = configService.get(EnvKey.DB_NAME);

        return {
          uri: dbUri,
          dbName,
        };
      },
    }),
    AssetModule,
    CryptoMarketDataModule,
    PerformanceTrackingModule,
    PortfolioModule,
    TransactionModule,
  ],
})
export class AppModule {}
