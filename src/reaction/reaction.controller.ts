import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ReactionService } from './reaction.service';
import { CreateReactionDto } from './dtos/create-reaction.dto';
import { CurrentUser } from '../user/decorators/current-user.decorator';
import { User } from '../user/user.entity';

@Controller('reaction')
export class ReactionController {

  constructor(private reactionService: ReactionService) {}

  @Post()
  react(
    @Body() body: CreateReactionDto,
    @CurrentUser() user: User
  ) {
    return this.reactionService.react(body, user);
  }

  @Get('/:postId')
  count(@Param('postId') postId: string) {
    return this.reactionService.countReactions(parseInt(postId));
  }

}