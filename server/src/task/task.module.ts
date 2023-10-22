import { Module } from '@nestjs/common';
import { TaskService } from './services/task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { HistoryModule } from 'src/history/history.module';
import { UpdateTaskService } from './services/update-task.service';
import { ChangeTitleCommand } from './commands/change-title-command';
import { ChangeStatusCommand } from './commands/change-status-command';
import { ChangeDescriptionCommand } from './commands/change-description-command';
import { ChangeResponsibilityCommand } from './commands/change-responsibility-command';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), HistoryModule],
  controllers: [TaskController],
  providers: [
    TaskService,
    UpdateTaskService,
    ChangeTitleCommand,
    ChangeStatusCommand,
    ChangeDescriptionCommand,
    ChangeResponsibilityCommand,
  ],
})
export class TaskModule {}
