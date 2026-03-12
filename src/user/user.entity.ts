import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Post } from '../post/post.entity';
import { Exclude } from 'class-transformer';
import { Reaction } from '../reaction/reaction.entity';

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ default: false })
  admin: boolean;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Reaction, (reaction) => reaction.user)
reactions: Reaction[];
}
