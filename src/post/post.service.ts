import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Post } from './post.entity';
import { CreatePostDto } from './dtos/create-post.dto';

@Injectable()
export class PostService {

  constructor(
    @InjectRepository(Post)
    private repo: Repository<Post>,
  ) {}

  create(postDto: CreatePostDto) {
    const post = this.repo.create(postDto);
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