import * as request from 'supertest';
import { taskData } from '../../test/mock/data/task';
import { NODE_SERVER_HOST } from '../../test/mock/data/config';
describe('HistoryController (e2e)', () => {
  it('/ should return all history by taskId (GET)', async () => {
    await request(NODE_SERVER_HOST)
      .get(`/history/task/${taskData.id}`)
      .expect(200);
  });
});
