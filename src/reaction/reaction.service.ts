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

    const existingReaction = await this.reactionRepo.findOne({
      where: {
        user: { id: user.id },
        post: { id: dto.postId },
      },
      relations: ['user', 'post'],
    });

    if (existingReaction) {
      existingReaction.type = dto.type;
      return this.reactionRepo.save(existingReaction);
    }

    const reaction = this.reactionRepo.create({
      type: dto.type,
      user: user,
      post: post,
    });

    return this.reactionRepo.save(reaction);
  }

  async countReactions(postId: number) {

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
      likes,
      dislikes,
    };
  }
}