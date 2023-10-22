import { InjectRepository } from '@nestjs/typeorm';
import { Command } from '../interface/command';
import { EntityManager, Repository } from 'typeorm';
import { HistoryService } from 'src/history/history.service';
import { ChangeStatusTaskDto } from '../dto/change-status-dto';
import { Task } from '../entities/task.entity';
import { ChangeTitleTaskDto } from '../dto/change-title.dto';

export class ChangeTitleCommand implements Command<ChangeTitleTaskDto> {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    private historyService: HistoryService,
  ) {}

  async execute(id: number, changeTitleTaskDto: ChangeTitleTaskDto) {
    await this.tasksRepository.manager.transaction(
      async (entityManager: EntityManager) => {
        const taskBeforeUpdate = await entityManager.findOneBy(Task, { id });

        if (!taskBeforeUpdate) {
          throw new Error('Task is not found!');
        }

        await entityManager.update(
          Task,
          { id },
          { title: changeTitleTaskDto.title },
        );

        await this.historyService.addUsingEntityManager(entityManager, {
          changedBy: changeTitleTaskDto.changedBy,
          current: { title: changeTitleTaskDto.title },
          property: 'title',
          previous: { title: taskBeforeUpdate.title },
          task: taskBeforeUpdate.id,
        });
      },
    );
  }
}
