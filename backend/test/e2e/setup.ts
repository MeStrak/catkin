import { Test } from '@nestjs/testing';
// It is used below
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app.module';

import createJWKSMock, { JWKSMock } from 'mock-jwks';
import JwksRsa from 'jwks-rsa';
import { getToken, startAuthServer } from '../auth.helpers';


declare global {
  namespace NodeJS {
    interface Global {
      jwks: JWKSMock;
      validAuthToken: string;
      app: INestApplication;
    }
  }
}
export default global;

beforeAll(async () => {
  try {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    global.app = moduleRef.createNestApplication();
    console.log('Starting NestJS server for e2e tests');

    await global.app.init();
    console.log('NestJS server started for e2e tests');

    global.jwks = startAuthServer("https://catkin-dev.eu.auth0.com");
    console.log('Mock Auth0 server started for e2e tests');

    global.validAuthToken = getToken(global.jwks);
    console.log('Mock Auth0 token generated for e2e tests');



    // await global.app.getHttpAdapter().getInstance().ready();
  } catch (e) {
    console.error('Could not start NestJS server for e2e tests', e);
    setTimeout(() => process.exit(1), 1000); // let display the error message
  }
}, 60 * 60 * 1000); // disable timeout so it doesn't start tests if NestJS doesn't start

afterAll(async () => {
  if (global.app) {
    await Promise.all([global.app.close()]);
  }
});