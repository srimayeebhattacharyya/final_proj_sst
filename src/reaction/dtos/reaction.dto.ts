import { Expose, Transform } from 'class-transformer';

export class ReactionDto {
  @Expose()
  id: string;

  @Expose()
  type: string;

  @Expose()
  @Transform(({ obj }) => obj.user?.email ?? null)
  userEmail: string | null;

  @Expose()
  @Transform(({ obj }) => obj.post?.id ?? null)
  postId: string | null;
}
