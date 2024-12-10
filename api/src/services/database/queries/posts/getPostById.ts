import {
  CommonQueryMethods,
  sql,
  NotFoundError as SlonikNotFoundError,
} from "slonik";
import { logger } from "../../../../logger";
import { InternalServerError } from "../../../../errors/server";
import { NotFoundError } from "../../../../errors/client";
import { Post, PostSchema } from "../../../../types/post";

interface GetPostByIdOptions {
  postId: string;
}

export const getPostById = async (
  database: CommonQueryMethods,
  { postId }: GetPostByIdOptions,
): Promise<Post> => {
  try {
    return await database.one(sql.type(PostSchema)`
      SELECT
        *
      FROM
        posts
      WHERE
        id = ${postId};
    `);
  } catch (error) {
    if (error instanceof SlonikNotFoundError) {
      throw new NotFoundError({
        code: "post-not-found",
        message: "Post with provided id, was not found in database",
      });
    }

    logger.error({ error }, "Error while getting post in database.");
    throw new InternalServerError({
      code: "unknown-error-getting-post-by-id",
      message: "Unknown error when trying to get post by id from database",
    });
  }
};
