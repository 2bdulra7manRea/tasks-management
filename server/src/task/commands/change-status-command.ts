import { InjectRepository } from '@nestjs/typeorm';
import { Command } from '../interface/command';
import { EntityManager, Repository } from 'typeorm';
import { HistoryService } from 'src/history/history.service';
import { ChangeStatusTaskDto } from '../dto/change-status-dto';
import { Task } from '../entities/task.entity';

export class ChangeStatusCommand implements Command<ChangeStatusTaskDto> {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    private historyService: HistoryService,
  ) {}

  async execute(id: number, changeStatusTaskDto: ChangeStatusTaskDto) {
    await this.tasksRepository.manager.transaction(
      async (entityManager: EntityManager) => {
        const taskBeforeUpdate = await entityManager.findOneBy(Task, { id });

        if (!taskBeforeUpdate) {
          throw new Error('Task is not found!');
        }

        await entityManager.update(
          Task,
          { id },
          { status: changeStatusTaskDto.status },
        );

        await this.historyService.addUsingEntityManager(entityManager, {
          changedBy: changeStatusTaskDto.changedBy,
          current: { status: changeStatusTaskDto.status },
          property: `status`,
          previous: { status: taskBeforeUpdate.status },
          task: taskBeforeUpdate.id,
        });
      },
    );
  }
}
