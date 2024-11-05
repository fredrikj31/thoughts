import {
  CommonQueryMethods,
  ForeignKeyIntegrityConstraintViolationError,
  sql,
} from "slonik";
import { randomUUID } from "crypto";
import { logger } from "../../../../logger";
import { InternalServerError } from "../../../../errors/server";
import { PostLike, PostLikeSchema } from "../../../../types/post";
import { BadRequestError } from "../../../../errors/client";

interface LikePostOptions {
  postId: string;
  userId: string;
}

export const likePost = async (
  database: CommonQueryMethods,
  { postId, userId }: LikePostOptions,
): Promise<PostLike> => {
  try {
    return await database.one(sql.type(PostLikeSchema)`
      INSERT INTO
        likes
      (
        id,
        post_id,
        user_id,
        created_at,
        updated_at,
        deleted_at
      )
      VALUES
      (
        ${randomUUID()},
        ${postId},
        ${userId},
        ${new Date().toISOString()},
        null,
        null
      )
      ON CONFLICT
        (post_id, user_id)
      DO UPDATE SET
        updated_at = ${new Date().toISOString()},
        deleted_at = null
      RETURNING *;
    `);
  } catch (error) {
    if (error instanceof ForeignKeyIntegrityConstraintViolationError) {
      if (error.constraint === "likes_post_id_references") {
        throw new BadRequestError({
          code: "post-not-found",
          message: "Post with the provided id was not found",
        });
      }
      if (error.constraint === "likes_user_id_references") {
        throw new BadRequestError({
          code: "user-not-found",
          message: "User with the provided id was not found",
        });
      }
    }

    logger.error(error, "Error while liking post.");
    throw new InternalServerError({
      code: "unknown-error-liking-post",
      message: "Unknown error when trying to like post",
    });
  }
};
