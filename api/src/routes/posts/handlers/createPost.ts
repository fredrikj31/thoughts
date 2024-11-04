import { CommonQueryMethods } from "slonik";
import { Post } from "../../../types/post";
import { createPost } from "../../../services/database/queries/posts/createPost";

interface CreatePostOptions {
  userId: string;
  content: string;
}

export const createPostHandler = async (
  database: CommonQueryMethods,
  { userId, content }: CreatePostOptions,
): Promise<Post> => {
  const post = await createPost(database, {
    userId,
    content,
  });

  return post;
};
