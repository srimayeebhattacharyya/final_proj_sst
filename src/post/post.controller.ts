import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Delete,
  UseInterceptors,
} from '@nestjs/common';

import { PostService } from './post.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { User } from 'src/user/user.entity';
import { CurrentUser } from 'src/user/decorators/current-user.decorator';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('posts')
@UseInterceptors(ClassSerializerInterceptor)
export class PostController {

  constructor(private postService: PostService) {}

  private serializePost(post: any) {
    const likes = post.reactions.filter((reaction) => reaction.type === 'LIKE').length;
    const dislikes = post.reactions.filter((reaction) => reaction.type === 'DISLIKE').length;

    return {
      id: post.id,
      title: post.title,
      description: post.description,
      createdDate: post.createdDate,
      like: likes,
      dislike: dislikes,
      userEmail: post.user.email,
    };
  }

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
      posts: posts.map((post) => this.serializePost(post)),
    }
  }

  @Get('/me')
  @UseGuards(AuthGuard)
  async getMyPosts(@CurrentUser() user: User) {
    const posts = await this.postService.findPostsByUser(user.id);
    return {
      posts: posts.map((post) => this.serializePost(post)),
    };
  }

  @Get('/:id')
  async getPost(@Param('id') id: string) {
    const post = await this.postService.findOne(id);

    if (!post) {
      return null;
    }

    return this.serializePost(post);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  deletePost(@Param('id') id: string, @CurrentUser() user: User) {
    return this.postService.delete(id, user);
  }

}
