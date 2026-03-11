import {
  Controller,
  Get,
  Post,
  Body,
  Param
} from '@nestjs/common';

import { PostService } from './post.service';
import { CreatePostDto } from './dtos/create-post.dto';

@Controller('posts')
export class PostController {

  constructor(private postService: PostService) {}

  @Post()
  createPost(@Body() body: CreatePostDto) {
    return this.postService.create(body);
  }

  @Get()
  getPosts() {
    return this.postService.findAll();
  }

  @Get('/:id')
  getPost(@Param('id') id: string) {
    return this.postService.findOne(parseInt(id));
  }

}