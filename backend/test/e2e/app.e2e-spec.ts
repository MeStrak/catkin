import request from 'supertest';

describe('AppController (e2e)', () => {
  it('/ (GET)', async () => request(global.app.getHttpServer()).get('/health').expect(200));
});