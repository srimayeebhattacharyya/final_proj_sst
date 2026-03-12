import {
  Controller,
  Get,
  Post,
  Body,
  Param
} from '@nestjs/common';

import { PostService } from './post.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { User } from 'src/user/user.entity';
import { CurrentUser } from 'src/user/decorators/current-user.decorator';

@Controller('posts')
export class PostController {

  constructor(private postService: PostService) {}

  @Post()
  createPost(@Body() body: CreatePostDto, @CurrentUser() user: User) {
    return this.postService.create(body, user);
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