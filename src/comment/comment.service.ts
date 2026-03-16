import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { UpdateCommentDto } from './dtos/update-comment.dto';
import { User } from '../user/user.entity';
import { Post } from '../post/post.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepo: Repository<Comment>,
    @InjectRepository(Post)
    private postRepo: Repository<Post>,
  ) {}

  async create(dto: CreateCommentDto, user: User) {
    const post = await this.postRepo.findOne({
      where: { id: dto.postId },
      relations: ['user'],
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const comment = this.commentRepo.create({
      content: dto.content,
      user,
      post,
    });

    return this.commentRepo.save(comment);
  }

  findAllByPost(postId: string) {
    return this.commentRepo.find({
      where: { post: { id: postId } },
      relations: ['user', 'post', 'post.user'],
      order: { createdAt: 'DESC' },
    });
  }

  async update(id: string, dto: UpdateCommentDto, user: User) {
    const comment = await this.commentRepo.findOne({
      where: { id },
      relations: ['user', 'post', 'post.user'],
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    if (comment.user.id !== user.id) {
      return { message: 'You are not the owner of this comment' };
    }

    Object.assign(comment, dto);
    return this.commentRepo.save(comment);
  }

  async delete(id: string, user: User) {
    const comment = await this.commentRepo.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    if (comment.user.id !== user.id) {
      return { message: 'You are not the owner of this comment' };
    }

    await this.commentRepo.remove(comment);
    return { message: 'Comment deleted successfully' };
  }
}
