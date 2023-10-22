import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TaskService } from './services/task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ChangeStatusTaskDto } from './dto/change-status-dto';
import { ChangeResponsibilityDto } from './dto/change-responsiblity.dto';
import { UpdateTaskService } from './services/update-task.service';
import { ChangeDescriptionTaskDto } from './dto/change-description.dto';
import { ChangeTitleTaskDto } from './dto/change-title.dto';
import { StateTransitionsPipe } from 'src/common/pipes/ state-transitions.pipe';

@ApiTags('tasks')
@Controller('task')
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
    private readonly updateTaskService: UpdateTaskService,
  ) {}

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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id);
  }

  @Patch('/status/:id')
  @ApiBody({ type: ChangeStatusTaskDto })
  changeStatusTask(
    @Param('id') id: string,
    @Body(new StateTransitionsPipe()) changeStatusTaskDto: ChangeStatusTaskDto,
  ) {
    return this.updateTaskService.changeStatusTask(+id, changeStatusTaskDto);
  }

  @Patch('/description/:id')
  @ApiBody({ type: ChangeDescriptionTaskDto })
  updateDescription(
    @Param('id') id: string,
    @Body() changeDescriptionTaskDto: ChangeDescriptionTaskDto,
  ) {
    return this.updateTaskService.updateDescription(
      +id,
      changeDescriptionTaskDto,
    );
  }

  @Patch('/title/:id')
  @ApiBody({ type: ChangeTitleTaskDto })
  updateTitle(
    @Param('id') id: string,
    @Body() changeTitleTaskDto: ChangeTitleTaskDto,
  ) {
    return this.updateTaskService.updateTitle(+id, changeTitleTaskDto);
  }

  @Patch('/responsibility/:id')
  @ApiBody({ type: ChangeResponsibilityDto })
  changeResponsibilityTask(
    @Param('id') id: string,
    @Body() changeResponsibilityDto: ChangeResponsibilityDto,
  ) {
    return this.updateTaskService.changeResponsibilityTask(
      +id,
      changeResponsibilityDto,
    );
  }
}
