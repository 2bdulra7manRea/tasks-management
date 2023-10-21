import { User } from 'src/user/entities/user.entity';
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
  changedBy: User;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
