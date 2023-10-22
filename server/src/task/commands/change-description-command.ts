import { InjectRepository } from '@nestjs/typeorm';
import { Command } from '../interface/command';
import { EntityManager, Repository } from 'typeorm';
import { HistoryService } from 'src/history/history.service';
import { ChangeStatusTaskDto } from '../dto/change-status-dto';
import { Task } from '../entities/task.entity';
import { ChangeTitleTaskDto } from '../dto/change-title.dto';
import { ChangeDescriptionTaskDto } from '../dto/change-description.dto';

export class ChangeDescriptionCommand
  implements Command<ChangeDescriptionTaskDto>
{
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    private historyService: HistoryService,
  ) {}

  async execute(
    id: number,
    changeDescriptionTaskDto: ChangeDescriptionTaskDto,
  ) {
    await this.tasksRepository.manager.transaction(
      async (entityManager: EntityManager) => {
        const taskBeforeUpdate = await entityManager.findOneBy(Task, { id });

        if (!taskBeforeUpdate) {
          throw new Error('Task is not found!');
        }

        await entityManager.update(
          Task,
          { id },
          { description: changeDescriptionTaskDto.description },
        );

        await this.historyService.addUsingEntityManager(entityManager, {
          changedBy: changeDescriptionTaskDto.changedBy,
          current: { title: changeDescriptionTaskDto.description },
          property: 'description',
          previous: { title: taskBeforeUpdate.description },
          task: taskBeforeUpdate.id,
        });
      },
    );
  }
}
