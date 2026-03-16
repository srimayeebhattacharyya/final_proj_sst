import { IsIn, IsUUID } from 'class-validator';

export class CreateReactionDto {

  @IsUUID()
  postId: string;

  @IsIn(['LIKE', 'DISLIKE'])
  type: string; // LIKE or DISLIKE
}
