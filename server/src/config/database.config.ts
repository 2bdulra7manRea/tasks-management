import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'process';
import { History } from 'src/history/entities/history.entity';
import { TaskHistory } from 'src/history/entities/task-history';
import { Task } from 'src/task/entities/task.entity';
import { User } from 'src/user/entities/user.entity';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: '172.19.0.3',
  port: 3306,
  username: 'root',
  password: '123',
  database: 'parking_space',
  entities: [Task, User, History, TaskHistory],
  synchronize: true,
  logging: true,
};
