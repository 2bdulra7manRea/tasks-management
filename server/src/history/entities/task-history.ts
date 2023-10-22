import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { History } from './history.entity';

@Entity('task_history')
export class TaskHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  status: string;

  @ManyToOne(() => User, (user) => user.reassignedTasksHistory, { eager: true })
  assignedTo: User;

  @OneToOne(() => History, (history) => history.previous, {
    cascade: ['insert'],
  })
  previous: History;

  @OneToOne(() => History, (history) => history.current, {
    cascade: ['insert'],
  })
  current: History;
}
