import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class ChangeResponsibilityDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  changedBy: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  assignedTo: number;
}
