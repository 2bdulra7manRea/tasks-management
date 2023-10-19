import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

enum STATUS {
  InProgress,
  ToDo,
  InQA,
  Deployed,
  Done,
  Blocked,
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: Number;

  @Column({ nullable: false })
  title: String;

  @Column({ nullable: false })
  description: String;

  @Column({ nullable: false, enum: STATUS })
  status: STATUS;

  @Column({ nullable: false })
  createdBy: User;

  @Column({ nullable: true })
  assignedTo: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
