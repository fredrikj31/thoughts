import { CommonQueryMethods } from "slonik";
import { Post } from "../../../types/post";
import { getPostById } from "../../../services/database/queries/posts/getPostById";
import { UnauthorizedError } from "../../../errors/client";
import { deletePost } from "../../../services/database/queries/posts/deletePost";

interface DeletePostHandlerOptions {
  postId: string;
  userId: string;
}

export const deletePostHandler = async (
  database: CommonQueryMethods,
  { postId, userId }: DeletePostHandlerOptions,
): Promise<Post> => {
  // Get post planed for deletion
  const post = await getPostById(database, { postId });

  // Check if user "owns" the post, and if are able to delete it
  if (userId !== post.userId) {
    throw new UnauthorizedError({
      code: "not-authorized-to-delete-post",
      message: "You didn't create the post and therefore can't delete it",
    });
  }

  const deletedPost = await deletePost(database, { postId });
  return deletedPost;
};
