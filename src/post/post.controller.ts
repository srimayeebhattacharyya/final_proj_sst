import { Body, Controller, Get, Post } from '@nestjs/common';
import { PostsService } from './post.service';
import { Post as BlogPost } from './post.entity';

@Controller('posts')
export class PostsController {

  constructor(private postsService: PostsService) {}

  @Post()
  createPost(@Body() body: Partial<BlogPost>) {
    return this.postsService.create(body);
  }

  @Get()
  getPosts() {
    return this.postsService.findAll();
  }

}