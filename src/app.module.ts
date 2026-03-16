import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';

import cookieSession from 'cookie-session';

import { AppDataSource } from '../data-source';
import { AuthModule } from './auth/auth.module';
import { ReactionModule } from './reaction/reaction.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
    UserModule,
    PostModule,
    AuthModule,
    ReactionModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: [process.env.COOKIE_KEY || 'default-key'],
        }),
      )
      .forRoutes('*');
  }
}
