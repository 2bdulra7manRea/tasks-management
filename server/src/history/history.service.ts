import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { History } from './entities/history.entity';
import { AddHistoryDto } from './dto/add-history.dto';
import { TaskHistory } from './entities/task-history';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(History)
    private historyRepository: Repository<History>,
    @InjectRepository(TaskHistory)
    private taskHistory: Repository<TaskHistory>,
  ) {}

  async add(addHistoryDto: AddHistoryDto) {
    addHistoryDto.current = this.taskHistory.create(addHistoryDto.current);
    addHistoryDto.previous = this.taskHistory.create(addHistoryDto.previous);
    return this.historyRepository.save(addHistoryDto);
  }

  async addUsingEntityManager(
    entityManager: EntityManager,
    addHistoryDto: AddHistoryDto,
  ) {
    addHistoryDto.current = this.taskHistory.create(addHistoryDto.current);
    addHistoryDto.previous = this.taskHistory.create(addHistoryDto.previous);

    return entityManager.save(History, addHistoryDto);
  }

  async findByTaskId(id: number) {
    return this.historyRepository.find({ where: { task: id } });
  }
}
