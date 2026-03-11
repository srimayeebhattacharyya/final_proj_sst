import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Post } from './post.entity';

@Injectable()
export class PostService {

  constructor(
    @InjectRepository(Post)
    private postRepo: Repository<Post>,
  ) {}

  createPost(data: Partial<Post>) {
    const post = this.postRepo.create(data);
    return this.postRepo.save(post);
  }

  findAllPosts() {
    return this.postRepo.find({
      relations: ['user']
    });
  }

  async findPostById(id: number) {
    const post = await this.postRepo.findOne({
      where: { id },
      relations: ['user']
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }

  async deletePost(id: number) {
    const post = await this.findPostById(id);
    return this.postRepo.remove(post);
  }

}