import {
  Controller,
  Get,
  Post as HttpPost,
  Body,
  Param,
  Delete
} from '@nestjs/common';

import { PostService } from './post.service';

@Controller('posts')
export class PostController {

  constructor(private postService: PostService) {}

  @HttpPost()
  create(@Body() body: any) {
    return this.postService.createPost(body);
  }

  @Get()
  getAll() {
    return this.postService.findAllPosts();
  }

  @Get('/:id')
  getOne(@Param('id') id: string) {
    return this.postService.findPostById(parseInt(id));
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.postService.deletePost(parseInt(id));
  }

}