import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { ReactionService } from './reaction.service';
import { CreateReactionDto } from './dtos/create-reaction.dto';
import { CurrentUser } from '../user/decorators/current-user.decorator';
import { User } from '../user/user.entity';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('reaction')
export class ReactionController {

  constructor(private reactionService: ReactionService) {}

  @Post()
  @UseGuards(AuthGuard)
  async react(
    @Body() body: CreateReactionDto,
    @CurrentUser() user: User
  ) {
    const result = await this.reactionService.react(body, user);
    return {
      id: result.id,
      type: result.type,
      userEmail: result.user.email,
      postId: result.post.id,
      
    }
  }

  @Get('/posts')
  getPostReactionSummary() {
    return this.reactionService.getAllPostReactionSummary();
  }

  @Get('/:postId')
  count(@Param('postId') postId: string) {
    return this.reactionService.countReactions(parseInt(postId));
  }

}
