import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { Post } from '../post/post.entity';
import { AuthGuard } from 'src/guards/auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Post])],
  controllers: [CommentController],
  providers: [CommentService, AuthGuard],
})
export class CommentModule {}
