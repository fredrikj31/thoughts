import {
  CommonQueryMethods,
  sql,
  NotFoundError as SlonikNotFoundError,
} from "slonik";
import { logger } from "../../../../logger";
import { InternalServerError } from "../../../../errors/server";
import { NotFoundError } from "../../../../errors/client";
import { Post, PostSchema } from "../../../../types/post";

interface DeletePostOptions {
  postId: string;
}

export const deletePost = async (
  database: CommonQueryMethods,
  { postId }: DeletePostOptions,
): Promise<Post> => {
  try {
    return await database.one(sql.type(PostSchema)`
      UPDATE
        posts
      SET
        deleted_at = ${new Date().toISOString()}
      WHERE
        id = ${postId}
      RETURNING *;
    `);
  } catch (error) {
    if (error instanceof SlonikNotFoundError) {
      throw new NotFoundError({
        code: "post-not-found",
        message: "Post with provided id, was not found in database",
      });
    }

    logger.error({ error }, "Error while deleting post in database.");
    throw new InternalServerError({
      code: "unknown-error-deleting-post-by-id",
      message: "Unknown error when trying to delete post by id from database",
    });
  }
};
