import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class ChangeStatusTaskDto {
  @ApiProperty()
  @IsNotEmpty()
  previousStatus: string;

  @ApiProperty()
  @IsNotEmpty()
  status: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  changedBy: number;
}
