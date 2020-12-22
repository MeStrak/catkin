import request from 'supertest';

describe('AppController (e2e)', () => {
  it('Returns healthy status', async () => request(global.app.getHttpServer()).get('/health').expect(200));
});