import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { Post } from '../post/post.entity';

@Entity()
export class Reaction {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string; // LIKE or DISLIKE

  @ManyToOne(() => User, (user) => user.reactions, { nullable: false })
  user: User;

  @ManyToOne(() => Post, (post) => post.reactions, { nullable: false })
  post: Post;
}
