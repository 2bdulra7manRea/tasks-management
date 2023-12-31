import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from '../dto/create-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../entities/task.entity';
import { Repository } from 'typeorm';
import { UpdateTaskService } from './update-task.service';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  create(createTaskDto: CreateTaskDto) {
    return this.tasksRepository.insert(createTaskDto);
  }

  findAll() {
    return this.tasksRepository.find({
      relations: ['history', 'assignedTo', 'createdBy'],
    });
  }

  findOne(id: number) {
    return this.tasksRepository.findOne({
      where: { id },
      relations: ['assignedTo', 'createdBy'],
    });
  }

  remove(id: number) {
    return this.tasksRepository.delete({ id });
  }
}
