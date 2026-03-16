import {
  Controller,
  Get,
  ParseUUIDPipe,
  Post,
  Body,
  Param,
  UseGuards,
  Delete,
} from '@nestjs/common';

import { PostService } from './post.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { User } from 'src/user/user.entity';
import { CurrentUser } from 'src/user/decorators/current-user.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { PostDto } from './dtos/post.dto';

@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(PostDto)
  createPost(@Body() body: CreatePostDto, @CurrentUser() user: User) {
    return this.postService.create(body, user);
  }

  @Get()
  @Serialize(PostDto)
  getPosts() {
    return this.postService.findAll();
  }

  @Get('/me')
  @UseGuards(AuthGuard)
  @Serialize(PostDto)
  getMyPosts(@CurrentUser() user: User) {
    return this.postService.findPostsByUser(user.id);
  }

  @Get('/:id')
  @Serialize(PostDto)
  getPost(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.postService.findOne(id);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  deletePost(@Param('id', new ParseUUIDPipe()) id: string, @CurrentUser() user: User) {
    return this.postService.delete(id, user);
  }

}
