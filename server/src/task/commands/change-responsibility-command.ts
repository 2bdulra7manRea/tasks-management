import { InjectRepository } from '@nestjs/typeorm';
import { Command } from '../interface/command';
import { EntityManager, Repository } from 'typeorm';
import { HistoryService } from 'src/history/history.service';
import { Task } from '../entities/task.entity';
import { ChangeResponsibilityDto } from '../dto/change-responsiblity.dto';

export class ChangeResponsibilityCommand
  implements Command<ChangeResponsibilityDto>
{
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    private historyService: HistoryService,
  ) {}

  async execute(id: number, changeResponsibilityDto: ChangeResponsibilityDto) {
    await this.tasksRepository.manager.transaction(
      async (entityManager: EntityManager) => {
        const taskBeforeUpdate = await entityManager.findOneBy(Task, { id });

        if (!taskBeforeUpdate) {
          throw new Error('Task is not found!');
        }

        await entityManager.update(
          Task,
          { id },
          { assignedTo: { id: changeResponsibilityDto.assignedTo } },
        );

        await this.historyService.addUsingEntityManager(entityManager, {
          changedBy: changeResponsibilityDto.changedBy,
          current: { assignedTo: { id: changeResponsibilityDto.assignedTo } },
          property: 'the responsibility',
          previous: { assignedTo: taskBeforeUpdate.assignedTo },
          task: taskBeforeUpdate.id,
        });
      },
    );
  }
}
