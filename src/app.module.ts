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
import { TransactionService } from './transaction/transaction.service';
import {
  GraphQLRequestContext,
  assetLoader,
  assetsLoader,
  transactionLoader,
  transactionsLoader,
} from './graphql';
import { IExpressContext } from './common/interfaces/express-context.interface';
import { AssetService } from './asset/asset.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      imports: [AssetModule, TransactionModule],
      inject: [AssetService, TransactionService],
      driver: ApolloDriver,
      useFactory: (
        assetService: AssetService,
        transactionService: TransactionService,
      ) => {
        return {
          autoSchemaFile: true,
          context: (expressContext: IExpressContext): GraphQLRequestContext => {
            return {
              headers: expressContext.req.headers,
              loaders: {
                assetLoader: assetLoader({
                  service: assetService,
                  fieldName: 'name',
                }),
                assetsLoader: assetsLoader({
                  service: assetService,
                  fieldName: 'name',
                }),
                transactionLoader: transactionLoader({
                  service: transactionService,
                  fieldName: 'id',
                }),
                transactionsLoader: transactionsLoader({
                  service: transactionService,
                  fieldName: 'portfolio',
                }),
              },
            };
          },
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
