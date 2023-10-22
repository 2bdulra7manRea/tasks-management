import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { History } from './entities/history.entity';
import { TaskHistory } from './entities/task-history';
import { HistoryController } from './history.controller';

@Module({
  controllers: [HistoryController],
  imports: [TypeOrmModule.forFeature([History, TaskHistory])],
  providers: [HistoryService],
  exports: [HistoryService],
})
export class HistoryModule {}
