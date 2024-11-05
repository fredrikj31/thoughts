import { CommonQueryMethods } from "slonik";
import { PostLike } from "../../../types/post";
import { likePost } from "../../../services/database/queries/posts/likePost";

interface LikePostHandlerOptions {
  postId: string;
  userId: string;
}

export const likePostHandler = async (
  database: CommonQueryMethods,
  { postId, userId }: LikePostHandlerOptions,
): Promise<PostLike> => {
  const likedPost = await likePost(database, {
    postId,
    userId,
  });

  return likedPost;
};
