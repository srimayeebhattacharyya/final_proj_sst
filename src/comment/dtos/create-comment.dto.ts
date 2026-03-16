import { IsString, IsUUID } from 'class-validator';

export class CreateCommentDto {
  @IsUUID()
  postId: string;

  @IsString()
  content: string;
}
