import { ValidationPipe, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import * as helmet from 'helmet';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.use(helmet());
  app.enableCors();
  const PORT = process.env.PORT || 3000;
  Logger.log('Setting port: ' + PORT, 'info');
  Logger.log('Auth0 domain: ' + process.env.AUTH0_DOMAIN, 'Auth0');

  await app.listen(PORT);
}
bootstrap();
