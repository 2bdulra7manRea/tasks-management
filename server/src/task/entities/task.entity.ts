import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
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

@Entity({ name: 'task' })
export class Task {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  description: string;

  @Column()
  status: string;

  @ManyToOne(() => User, (user) => user.createdTasks)
  @JoinColumn()
  createdBy: User;

  @ManyToOne(() => User, (user) => user.assignedTasks)
  @JoinColumn()
  assignedTo: User;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
