import { Module } from '@nestjs/common';
import { TaskService } from './services/task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { HistoryModule } from 'src/history/history.module';
import { UpdateTaskService } from './services/update-task.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), HistoryModule],
  controllers: [TaskController],
  providers: [TaskService, UpdateTaskService],
})
export class TaskModule {}
