import { Task } from 'src/task/entities/task.entity';
import { User } from 'src/user/entities/user.entity';
import internal from 'stream';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TaskHistory } from './task-history';

@Entity({ name: 'history' })
export class History {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => TaskHistory, (taskHistory) => taskHistory, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  previous: TaskHistory;

  @OneToOne(() => TaskHistory, (taskHistory) => taskHistory, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  current: TaskHistory;

  @Column({ nullable: true })
  property: string;

  @ManyToOne(() => User, (user) => user.changedTasks, { eager: true })
  changedBy: number;

  @ManyToOne(() => Task, (task) => task.history)
  task: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
