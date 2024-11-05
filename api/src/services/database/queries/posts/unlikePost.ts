import {
  CommonQueryMethods,
  NotFoundError as SlonikNotFoundError,
  sql,
} from "slonik";
import { logger } from "../../../../logger";
import { InternalServerError } from "../../../../errors/server";
import { PostLike, PostLikeSchema } from "../../../../types/post";
import { NotFoundError } from "../../../../errors/client";

interface UnlikePostOptions {
  postId: string;
  userId: string;
}

export const unlikePost = async (
  database: CommonQueryMethods,
  { postId, userId }: UnlikePostOptions,
): Promise<PostLike> => {
  try {
    return await database.one(sql.type(PostLikeSchema)`
      UPDATE
        likes
      SET
        deleted_at = ${new Date().toISOString()}
      WHERE
        post_id = ${postId}
      AND
        user_id = ${userId}
      RETURNING *;
    `);
  } catch (error) {
    if (error instanceof SlonikNotFoundError) {
      throw new NotFoundError({
        code: "post-like-not-found",
        message: "Like for the specific post and user was not found",
      });
    }

    logger.error(error, "Error while unliking post.");
    throw new InternalServerError({
      code: "unknown-error-unliking-post",
      message: "Unknown error when trying to unlike post",
    });
  }
};
