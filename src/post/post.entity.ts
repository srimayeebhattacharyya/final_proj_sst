import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

import { User } from '../user/user.entity';

@Entity()
export class Post {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @CreateDateColumn()
  createdDate: Date;

  @Column({ default: 0 })
  like: number;

  @Column({ default: 0 })
  dislike: number;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;
}