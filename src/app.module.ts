import { Module } from '@nestjs/common';
import { PortforlioModule } from './portfolio/portfolio.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { EnvKey } from './common/data/config/env-key.enum';
import { TransactionModule } from './transaction/transaction.module';
import { AssetModule } from './asset/asset.module';
import { gqlErrorFormatter } from './common/errors/utils/gql-error-formatter.util';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: true,
      formatError: gqlErrorFormatter,
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
    PortforlioModule,
    TransactionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
