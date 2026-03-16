import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { UpdateCommentDto } from './dtos/update-comment.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/user/decorators/current-user.decorator';
import { User } from 'src/user/user.entity';

@Controller('comments')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Post()
  @UseGuards(AuthGuard)
  async createComment(@Body() body: CreateCommentDto, @CurrentUser() user: User) {
    const comment = await this.commentService.create(body, user);

    return {
      id: comment.id,
      content: comment.content,
      createdAt: comment.createdAt,
      commentUserEmail: user.email,
      postId: comment.post.id,
      postOwnerEmail: comment.post.user.email,
    };
  }

  @Get('/post/:postId')
  async getCommentsForPost(@Param('postId') postId: string) {
    const comments = await this.commentService.findAllByPost(postId);

    return {
      postId,
      comments: comments.map((comment) => ({
        id: comment.id,
        content: comment.content,
        createdAt: comment.createdAt,
        commentUserEmail: comment.user.email,
        postOwnerEmail: comment.post.user.email,
      })),
    };
  }

  @Patch('/:id')
  @UseGuards(AuthGuard)
  async updateComment(
    @Param('id') id: string,
    @Body() body: UpdateCommentDto,
    @CurrentUser() user: User,
  ) {
    const comment = await this.commentService.update(id, body, user);

    if ('message' in comment) {
      return comment;
    }

    return {
      id: comment.id,
      content: comment.content,
      createdAt: comment.createdAt,
      commentUserEmail: comment.user.email,
      postId: comment.post.id,
      postOwnerEmail: comment.post.user.email,
    };
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  deleteComment(@Param('id') id: string, @CurrentUser() user: User) {
    return this.commentService.delete(id, user);
  }
}
