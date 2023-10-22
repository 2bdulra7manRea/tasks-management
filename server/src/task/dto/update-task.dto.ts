import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { IsInt, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsOptional()
  title?: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  @IsInt()
  assignedTo?: any;

  @IsOptional()
  status?: string;
}
