import { IsString, IsNumber } from 'class-validator';

export class CreateReactionDto {

  @IsNumber()
  postId: number;

  @IsString()
  type: string; // LIKE or DISLIKE
}