import { Expose, Transform } from 'class-transformer';

export class CommentDto {
  @Expose()
  id: string;

  @Expose()
  content: string;

  @Expose()
  createdAt: Date;

  @Expose()
  @Transform(({ obj }) => obj.user?.email ?? null)
  commentUserEmail: string | null;

  @Expose()
  @Transform(({ obj }) => obj.post?.id ?? null)
  postId: string | null;

  @Expose()
  @Transform(({ obj }) => obj.post?.user?.email ?? null)
  postOwnerEmail: string | null;
}
