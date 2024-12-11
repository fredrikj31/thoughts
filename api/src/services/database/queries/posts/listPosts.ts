import { CommonQueryMethods, sql } from "slonik";
import { logger } from "../../../../logger";
import { InternalServerError } from "../../../../errors/server";
import { PostWithUser, PostWithUserSchema } from "../../../../types/post";

interface ListPostsOptions {
  userId: string;
}

export const listPosts = async (
  database: CommonQueryMethods,
  { userId }: ListPostsOptions,
): Promise<PostWithUser[]> => {
  const result = await database
    .any(
      sql.type(PostWithUserSchema)`
        SELECT
          posts.id,
          posts.content,
          posts.created_at,
          posts.updated_at,
          posts.deleted_at,
          json_build_object(
            'id', users.id,
            'username', users.username,
            'email', users.email,
            'firstName', users.first_name,
            'lastName', users.last_name,
            'birthDate', users.birth_date,
            'gender', users.gender
          ) as user
        FROM
          posts
          JOIN friends ON friends.friend_id = posts.user_id
          JOIN users ON users.id = posts.user_id
        WHERE
          (
            friends.user_id = ${userId}
            OR 
            posts.user_id = ${userId}
          )
        AND
          posts.deleted_at IS NULL
        ORDER BY
          posts.created_at DESC;
      `,
    )
    .catch((error: unknown) => {
      logger.error(error, "Error while listings posts.");
      throw new InternalServerError({
        code: "unknown-error-listing-posts",
        message: "Unknown error when trying to list posts",
      });
    });

  return [...result];
};
