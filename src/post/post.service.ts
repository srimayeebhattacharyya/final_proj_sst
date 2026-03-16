import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Post } from './post.entity';
import { CreatePostDto } from './dtos/create-post.dto';
import { User } from '../user/user.entity';
@Injectable()
export class PostService {

  constructor(
    @InjectRepository(Post)
    private repo: Repository<Post>,
  ) {}

  create(dto: CreatePostDto, user: User) {
  const post = this.repo.create(dto);
  post.user = user;
  return this.repo.save(post);
}

  findAll() {
    return this.repo.find({
      relations: ['user', 'reactions'],
      order: { createdDate: 'DESC' },
    });
  }

  findOne(id: string) {
    return this.repo.findOne({
      where: { id },
      relations: ['user', 'reactions']
    });
  }

  findPostsByUser(userId: string) {
    return this.repo.find({
      where: { user: { id: userId } },
      relations: ['user', 'reactions'],
      order: { createdDate: 'DESC' },
    });
  }

  async delete(id: string, user: User) {
    const post = await this.findOne(id);
    if (!post) {
      return "post not found";
    }
    if (post.user.id !== user.id) {
      return "you are not the owner of this post";
    }
    await this.repo.remove(post);
    return "post deleted successfully";
  }
}
