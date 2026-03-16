import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { ReactionService } from './reaction.service';
import { CreateReactionDto } from './dtos/create-reaction.dto';
import { CurrentUser } from '../user/decorators/current-user.decorator';
import { User } from '../user/user.entity';
import { AuthGuard } from 'src/guards/auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ReactionDto } from './dtos/reaction.dto';

@Controller('reaction')
export class ReactionController {

  constructor(private reactionService: ReactionService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ReactionDto)
  react(
    @Body() body: CreateReactionDto,
    @CurrentUser() user: User
  ) {
    return this.reactionService.react(body, user);
  }

  @Get('/posts')
  getPostReactionSummary() {
    return this.reactionService.getAllPostReactionSummary();
  }

  @Get('/:postId')
  count(@Param('postId') postId: string) {
    return this.reactionService.countReactions(postId);
  }

}
