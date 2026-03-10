import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';

@Injectable()
export class PostsService {

  constructor(
    @InjectRepository(Post)
    private repo: Repository<Post>,
  ) {}

  create(post: Partial<Post>) {
    const newPost = this.repo.create(post);
    return this.repo.save(newPost);
  }

  findAll() {
    return this.repo.find({ relations: ['user'] });
  }

}