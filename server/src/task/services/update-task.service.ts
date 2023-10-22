import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ChangeResponsibilityDto } from '../dto/change-responsiblity.dto';
import { ChangeStatusTaskDto } from '../dto/change-status-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HistoryService } from 'src/history/history.service';
import { EntityManager, Repository } from 'typeorm';
import { Task } from '../entities/task.entity';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { ChangeTitleTaskDto } from '../dto/change-title.dto';
import { ChangeDescriptionTaskDto } from '../dto/change-description.dto';

@Injectable()
export class UpdateTaskService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    private historyService: HistoryService,
  ) {}

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    return this.tasksRepository.update({ id }, updateTaskDto);
  }

  async changeResponsibilityTask(
    id: number,
    changeResponsibilityDto: ChangeResponsibilityDto,
  ) {
    try {
      const taskBeforeUpdate = await this.tasksRepository.findOne({
        where: { id },
      });

      if (!taskBeforeUpdate) {
        throw new HttpException(
          'Could not find the task',
          HttpStatus.BAD_REQUEST,
        );
      }

      const updateResult = await this.tasksRepository.update(id, {
        assignedTo: { id: changeResponsibilityDto.assignedTo },
      });

      this.historyService.add({
        changedBy: changeResponsibilityDto.changedBy,
        current: { assignedTo: { id: changeResponsibilityDto.assignedTo } },
        property: 'the responsibility',
        previous: { assignedTo: taskBeforeUpdate.assignedTo },
        task: taskBeforeUpdate.id,
      });

      return updateResult;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async updateDescription(
    id: number,
    changeDescriptionTaskDto: ChangeDescriptionTaskDto,
  ) {
    await this.update(id, {
      description: changeDescriptionTaskDto.description,
    });
  }

  async updateTitle(id: number, changeTitleTaskDto: ChangeTitleTaskDto) {
    await this.update(id, { description: changeTitleTaskDto.title });
  }

  async changeStatusTask(id: number, changeStatusTaskDto: ChangeStatusTaskDto) {
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
