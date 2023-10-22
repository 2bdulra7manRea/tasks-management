import * as request from 'supertest';
import {
  taskData,
  updatedTaskResponsibility,
  updatedTaskStatus,
} from '../../test/mock/data/task';
import { NODE_SERVER_HOST } from '../../test/mock/data/config';
describe('TaskController (e2e)', () => {
  it('/ should return all tasks (GET)', async () => {
    const response = await request(NODE_SERVER_HOST).get('/task').expect(200);

    expect(response.body).toBeDefined();
  });

  it('/ should return task by Id (GET)', async () => {
    const response = await request(NODE_SERVER_HOST)
      .get(`/task/${taskData.id}`)
      .expect(200);
  });

  it('/ should return update the task responsibility ', async () => {
    const response = await request(NODE_SERVER_HOST)
      .patch(`/task/responsibility/${taskData.id}`)
      .send(updatedTaskResponsibility)
      .expect(200);
  });

  it('/ should return update the task status', async () => {
    await request(NODE_SERVER_HOST)
      .patch(`/task/status/${taskData.id}`)
      .send(updatedTaskStatus)
      .expect(200);
  });
});
