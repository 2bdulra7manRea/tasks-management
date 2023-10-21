import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { History } from './entities/history.entity';
import { AddHistoryDto } from './dto/add-history.dto';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(History)
    private historyRepository: Repository<History>,
  ) {}

  add(addHistoryDto: AddHistoryDto) {
    return this.historyRepository.insert(addHistoryDto);
  }
}
