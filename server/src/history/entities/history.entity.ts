import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class History {
  @PrimaryGeneratedColumn()
  id: Number;

  @Column({ nullable: false })
  previous: String;

  @Column({ nullable: false })
  current: String;

  @Column({ nullable: false })
  property: String;

  @Column({ nullable: false })
  changedBy: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
