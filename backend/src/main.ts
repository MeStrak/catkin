import { ValidationPipe, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import helmet from 'helmet';

import { AppModule } from './app.module';
import { trace } from './recap.dev';

trace();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.use(
    helmet({
      contentSecurityPolicy:
        process.env.NODE_ENV === 'production' ? undefined : false,
    }),
  );
  app.enableCors();

  require('newrelic');
  const PORT = process.env.PORT || 3000;
  Logger.log('Setting port: ' + PORT, 'info');
  Logger.log('Auth0 domain: ' + process.env.AUTH0_DOMAIN, 'Auth0');
  Logger.log('New Relic enabled: ' + process.env.NEW_RELIC_ENABLED, 'newrelic');
  Logger.log(
    'New Relic app name: ' + process.env.NEW_RELIC_APP_NAME,
    'newrelic',
  );
  Logger.log(
    'recap.dev enabled: ' + process.env.RECAP_DEV_ENABLED,
    'recap.dev',
  );

  await app.listen(PORT);
}
bootstrap();
