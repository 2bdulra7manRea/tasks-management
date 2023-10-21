import { Task } from 'src/task/entities/task.entity';
import { User } from 'src/user/entities/user.entity';
import internal from 'stream';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'history' })
export class History {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  previous: string;

  @Column({ nullable: false })
  current: string;

  @Column({ nullable: false })
  property: string;

  @ManyToOne(() => User, (user) => user.changedTasks)
  changedBy: number;

  @ManyToOne(() => Task, (task) => task.history)
  task: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
