import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ChangeStatusTaskDto } from './dto/change-status-dto';
import { ChangeResponsibilityDto } from './dto/change-responsiblity.dto';

@ApiTags('tasks')
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @ApiBody({ type: CreateTaskDto })
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  findAll() {
    return this.taskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(+id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateTaskDto })
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id);
  }

  @Patch('/status/:id')
  @ApiBody({ type: ChangeStatusTaskDto })
  changeStatusTask(
    @Param('id') id: string,
    @Body() changeStatusTaskDto: ChangeStatusTaskDto,
  ) {
    return this.taskService.changeStatusTask(+id, changeStatusTaskDto);
  }

  @Patch('/responsibility/:id')
  @ApiBody({ type: ChangeResponsibilityDto })
  changeResponsibilityTask(
    @Param('id') id: string,
    @Body() changeResponsibilityDto: ChangeResponsibilityDto,
  ) {
    return this.taskService.changeResponsibilityTask(
      +id,
      changeResponsibilityDto,
    );
  }
}
