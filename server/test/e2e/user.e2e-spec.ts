import * as request from 'supertest';
import { createUserData } from '../../test/mock/data/user';
import { NODE_SERVER_HOST } from '../../test/mock/data/config';
describe('UserController (e2e)', () => {
  it('/ should create user', async () => {
    await request(NODE_SERVER_HOST)
      .post(`/user/`)
      .send(createUserData)
      .expect(200);
  });
});
