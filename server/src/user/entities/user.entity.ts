import { History } from 'src/history/entities/history.entity';
import { TaskHistory } from 'src/history/entities/task-history';
import { Task } from 'src/task/entities/task.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @OneToMany(() => Task, (task) => task.assignedTo)
  assignedTasks: Task[];

  @OneToMany(() => Task, (task) => task.createdBy)
  createdTasks: Task[];

  @OneToMany(() => History, (history) => history.changedBy)
  changedTasks: History[];

  @OneToMany(() => TaskHistory, (taskHistory) => taskHistory.assignedTo)
  reassignedTasksHistory: TaskHistory[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
