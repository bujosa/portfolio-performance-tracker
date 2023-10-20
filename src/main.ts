import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { JoiValidationPipe } from './common/pipes';
import { MongoSanitizeInterceptor } from './common/mongo/interceptors/mongo-sanitize.interceptor';
import { ConfigService } from '@nestjs/config';
import { EnvKey } from './common/data/config/env-key.enum';
import { CustomExceptionsFilter } from './common/filters/custom.exception-filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors();

  // Sanitize all inputs to prevent NoSQL injection
  app.useGlobalInterceptors(new MongoSanitizeInterceptor());

  // Validate all inputs using Joi
  app.useGlobalPipes(new JoiValidationPipe());

  app.useGlobalFilters(new CustomExceptionsFilter());

  const configService: ConfigService = app.get(ConfigService);

  await app.listen(configService.get(EnvKey.PORT));
}
bootstrap();
