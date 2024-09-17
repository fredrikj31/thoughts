import { CommonQueryMethods, sql } from "slonik";
import { randomUUID } from "crypto";
import { logger } from "../../../../logger";
import { InternalServerError } from "../../../../errors/server";
import { Post, PostSchema } from "../../../../types/post";

interface CreatePostOptions {
  userId: string;
  content: string;
}

export const createPost = async (
  database: CommonQueryMethods,
  { userId, content }: CreatePostOptions,
): Promise<Post> => {
  try {
    return await database.one(sql.type(PostSchema)`
      INSERT INTO
        posts
      (
        id,
        user_id,
        content,
        created_at,
        updated_at,
        deleted_at
      )
      VALUES
      (
        ${randomUUID()},
        ${userId},
        ${content},
        ${new Date().toISOString()},
        null,
        null
      )
      RETURNING *;
    `);
  } catch (error) {
    logger.error(error, "Error while creating post.");
    throw new InternalServerError({
      code: "unknown-error-creating-post",
      message: "Unknown error when trying to create post",
    });
  }
};
