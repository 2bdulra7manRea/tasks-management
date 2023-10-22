import { Controller, Get, Param } from '@nestjs/common';
import { HistoryService } from './history.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('history')
@Controller('task-history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get('/task/:id')
  get(@Param('id') id: string) {
    return this.historyService.findByTaskId(+id);
  }
}
