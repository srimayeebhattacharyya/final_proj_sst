import { Module } from '@nestjs/common';
import { ReactionController } from './reaction.controller';
import { ReactionService } from './reaction.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reaction } from './reaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reaction])],
  controllers: [ReactionController],
  providers: [ReactionService]
})
export class ReactionModule {}
