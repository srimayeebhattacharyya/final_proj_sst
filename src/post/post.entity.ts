import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn
} from 'typeorm';

import { User } from '../user/user.entity';
import { OneToMany } from 'typeorm';
import { Reaction } from 'src/reaction/reaction.entity';
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

  @OneToMany(() => Reaction, (reaction) => reaction.post)
reactions: Reaction[];
}