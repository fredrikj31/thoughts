import { CommonQueryMethods } from "slonik";
import { PostLike } from "../../../types/post";
import { unlikePost } from "../../../services/database/queries/posts/unlikePost";

interface UnlikePostHandlerOptions {
  postId: string;
  userId: string;
}

export const unlikePostHandler = async (
  database: CommonQueryMethods,
  { postId, userId }: UnlikePostHandlerOptions,
): Promise<PostLike> => {
  const unlikedPost = await unlikePost(database, {
    postId,
    userId,
  });

  return unlikedPost;
};
