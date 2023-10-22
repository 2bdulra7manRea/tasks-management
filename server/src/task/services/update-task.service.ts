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
import { ChangeResponsibilityCommand } from '../commands/change-responsibility-command';
import { ChangeDescriptionCommand } from '../commands/change-description-command';
import { ChangeTitleCommand } from '../commands/change-title-command';

@Injectable()
export class UpdateTaskService {
  constructor(
    private readonly changeStatusCommand: ChangeStatusCommand,
    private readonly changeResponsibilityCommand: ChangeResponsibilityCommand,
    private readonly changeDescriptionCommand: ChangeDescriptionCommand,
    private readonly changeTitleCommand: ChangeTitleCommand,
  ) {}

  async changeResponsibilityTask(
    id: number,
    changeResponsibilityDto: ChangeResponsibilityDto,
  ) {
    return this.changeResponsibilityCommand.execute(
      id,
      changeResponsibilityDto,
    );
  }

  async updateDescription(
    id: number,
    changeDescriptionTaskDto: ChangeDescriptionTaskDto,
  ) {
    return this.changeDescriptionCommand.execute(id, changeDescriptionTaskDto);
  }

  async updateTitle(id: number, changeTitleTaskDto: ChangeTitleTaskDto) {
    await this.changeTitleCommand.execute(id, changeTitleTaskDto);
  }

  async changeStatusTask(id: number, changeStatusTaskDto: ChangeStatusTaskDto) {
    await this.changeStatusCommand.execute(id, changeStatusTaskDto);
  }
}
