import { Expose, Transform } from 'class-transformer';

export class PostDto {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  createdDate: Date;

  @Expose()
  @Transform(({ obj }) =>
    obj.reactions?.filter((reaction) => reaction.type === 'LIKE').length ?? obj.like ?? 0,
  )
  like: number;

  @Expose()
  @Transform(({ obj }) =>
    obj.reactions?.filter((reaction) => reaction.type === 'DISLIKE').length ?? obj.dislike ?? 0,
  )
  dislike: number;

  @Expose()
  @Transform(({ obj }) => obj.user?.email ?? null)
  userEmail: string | null;
}
