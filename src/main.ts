import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { JoiValidationPipe } from './common/pipes';
import { MongoSanitizeInterceptor } from './common/mongo/interceptors/mongo-sanitize.interceptor';
import { ConfigService } from '@nestjs/config';
import { EnvKey } from './common/data/config/env-key.enum';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors();

  // Sanitize all inputs to prevent NoSQL injection
  app.useGlobalInterceptors(new MongoSanitizeInterceptor());

  // Validate all inputs using Joi
  app.useGlobalPipes(new JoiValidationPipe());

  const configService: ConfigService = app.get(ConfigService);

  await app.listen(configService.get(EnvKey.PORT));
}
bootstrap();
