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
import { ChangeStatusCommand } from '../commands/change-status-command';

@Injectable()
export class UpdateTaskService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    private historyService: HistoryService,
    private readonly changeStatusCommand: ChangeStatusCommand,
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
    this.changeStatusCommand.execute(id, changeStatusTaskDto);
  }
}
