import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { ChangeStatusTaskDto } from './dto/change-status-dto';
import { HistoryService } from 'src/history/history.service';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    private historyService: HistoryService,
  ) {}

  create(createTaskDto: CreateTaskDto) {
    return this.tasksRepository.insert(createTaskDto);
  }

  findAll() {
    return this.tasksRepository.find({ relations: ['history'] });
  }

  findOne(id: number) {
    return this.tasksRepository.findOne({ where: { id } });
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return this.tasksRepository.update({ id }, updateTaskDto);
  }

  remove(id: number) {
    return this.tasksRepository.delete({ id });
  }

  async changeStatusTask(id: number, changeStatusTaskDto: ChangeStatusTaskDto) {
    const taskBeforeUpdate = await this.tasksRepository.findOneBy({ id });

    if (!taskBeforeUpdate) {
      throw new HttpException(
        'Could not find the task',
        HttpStatus.BAD_REQUEST,
      );
    }

    // should check before update / or find
    await this.update(id, { status: changeStatusTaskDto.status });

    this.historyService.add({
      changedBy: changeStatusTaskDto.changedBy,
      current: changeStatusTaskDto.status,
      property: `status`,
      previous: taskBeforeUpdate.status,
      task: taskBeforeUpdate.id,
    });
  }
}
