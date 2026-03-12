import {
  Controller,
  Get,
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

@Controller('posts')
export class PostController {

  constructor(private postService: PostService) {}

  @Post()
  @UseGuards(AuthGuard)
  async createPost(@Body() body: CreatePostDto, @CurrentUser() user: User) {
    const post = await this.postService.create(body, user);

    return {
      id: post.id,
      title: post.title,
      description: post.description,
      createdDate: post.createdDate,
      like: post.like,
      dislike: post.dislike,
      userEmail: user.email,
    };
  }

  @Get()
  async getPosts() {
    const posts = await this.postService.findAll();
    return {
      posts: posts.map((post) => ({
        id: post.id,
        title: post.title,
        description: post.description,
        createdDate: post.createdDate,
        like: post.like,
        dislike: post.dislike,
        userEmail: post.user.email,
      })),
    }
  }

  @Get('/me/ids')
  @UseGuards(AuthGuard)
  getMyPostIds(@CurrentUser() user: User) {
    return this.postService.findPostIdsByUser(user.id);
  }

  @Get('/:id')
  getPost(@Param('id') id: string) {
    return this.postService.findOne(parseInt(id));
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  deletePost(@Param('id') id: string, @CurrentUser() user: User) {
    return this.postService.delete(parseInt(id), user);
  }

}
