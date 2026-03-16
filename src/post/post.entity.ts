import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn
} from 'typeorm';

import { User } from '../user/user.entity';
import { OneToMany } from 'typeorm';
import { Reaction } from '../reaction/reaction.entity';
import { Comment } from '../comment/comment.entity';
@Entity()
export class Post {

  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @ManyToOne(() => User, (user) => user.posts, { nullable: false })
  user: User;

  @OneToMany(() => Reaction, (reaction) => reaction.post)
  reactions: Reaction[];

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];
}
