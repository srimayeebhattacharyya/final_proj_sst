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

  async findPostIdsByUser(userId: number) {
    const rows = await this.repo
      .createQueryBuilder('post')
      .select('post.id', 'id')
      .where('post.userId = :userId', { userId })
      .orderBy('post.id', 'ASC')
      .getRawMany();
      //diff b/w getRawMany and getMany is that getRawMany returns the raw result from the database, while getMany returns instances of the entity with all the properties and methods defined in the entity class. In this case, since we are only selecting the post.id, getRawMany is more appropriate as it will return an array of objects with an id property, whereas getMany would return an array of Post entities with only the id property populated and other properties undefined.

    return rows.map((row) => Number(row.id));
  }

  async delete(id: number, user: User) {
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
