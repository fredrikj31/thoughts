import { CommonQueryMethods } from "slonik";
import { PostWithUser } from "../../../types/post";
import { listPosts } from "../../../services/database/queries/posts/listPosts";

interface ListPostsOptions {
  userId: string;
}

export const listPostsHandler = async (
  database: CommonQueryMethods,
  { userId }: ListPostsOptions,
): Promise<PostWithUser[]> => {
  const posts = await listPosts(database, {
    userId,
  });

  return posts;
};
