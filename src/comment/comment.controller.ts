import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { UpdateCommentDto } from './dtos/update-comment.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/user/decorators/current-user.decorator';
import { User } from 'src/user/user.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CommentDto } from './dtos/comment.dto';

@Controller('comments')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(CommentDto)
  createComment(@Body() body: CreateCommentDto, @CurrentUser() user: User) {
    return this.commentService.create(body, user);
  }

  @Get('/post/:postId')
  @Serialize(CommentDto)
  getCommentsForPost(@Param('postId', new ParseUUIDPipe()) postId: string) {
    return this.commentService.findAllByPost(postId);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard)
  @Serialize(CommentDto)
  async updateComment(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateCommentDto,
    @CurrentUser() user: User,
  ) {
    const comment = await this.commentService.update(id, body, user);

    if ('message' in comment) {
      return comment;
    }

    return comment;
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  deleteComment(@Param('id', new ParseUUIDPipe()) id: string, @CurrentUser() user: User) {
    return this.commentService.delete(id, user);
  }
}
