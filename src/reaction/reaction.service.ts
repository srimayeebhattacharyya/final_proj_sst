import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reaction } from './reaction.entity';
import { Post } from '../post/post.entity';
import { User } from '../user/user.entity';
import { CreateReactionDto } from './dtos/create-reaction.dto';

@Injectable()
export class ReactionService {
  constructor(
    @InjectRepository(Reaction)
    private reactionRepo: Repository<Reaction>,

    @InjectRepository(Post)
    private postRepo: Repository<Post>,
  ) {}

  async react(dto: CreateReactionDto, user: User) {
    const post = await this.postRepo.findOne({
      where: { id: dto.postId },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const reaction = this.reactionRepo.create({
      type: dto.type,
      user,
      post,
    });

    return this.reactionRepo.save(reaction);
  }

  async countReactions(postId: string) {
    const post = await this.postRepo.findOne({
      where: { id: postId },
      relations: ['user'],
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const likes = await this.reactionRepo.count({
      where: {
        post: { id: postId },
        type: 'LIKE',
      },
    });

    const dislikes = await this.reactionRepo.count({
      where: {
        post: { id: postId },
        type: 'DISLIKE',
      },
    });

    return {
      postId,
      userEmail: post.user?.email || null,
      likes,
      dislikes,
    };
  }

  async getAllPostReactionSummary() {
    const posts = await this.postRepo.find({
      relations: ['user', 'reactions'],
    });

    return posts.map((post) => {
      const likes = post.reactions.filter((reaction) => reaction.type === 'LIKE').length;
      const dislikes = post.reactions.filter((reaction) => reaction.type === 'DISLIKE').length;

      return {
        postId: post.id,
        title: post.title,
        userEmail: post.user?.email || null,
        likes,
        dislikes,
      };
    });
  }
}
