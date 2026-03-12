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
      relations: ['user']
    });
  }

  findOne(id: number) {
    return this.repo.findOne({
      where: { id },
      relations: ['user']
    });
  }

}