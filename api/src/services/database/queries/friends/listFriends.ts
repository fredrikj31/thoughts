import { CommonQueryMethods, sql } from "slonik";
import { FriendWithUser, FriendWithUserSchema } from "../../../../types/friend";
import { logger } from "../../../../logger";
import { InternalServerError } from "../../../../errors/server";

interface ListFriendsOptions {
  userId: string;
  pageToken: string | undefined;
  limit: number;
}

export const listFriends = async (
  database: CommonQueryMethods,
  { userId, pageToken, limit }: ListFriendsOptions,
): Promise<Readonly<FriendWithUser[]>> => {
  const previousPage: string[] | undefined = pageToken?.split("_");
  const previousPageLastId = previousPage?.[0];
  const previousPageLastCreatedAtTimestamp = previousPage?.[1];

  try {
    return await database.any(sql.type(FriendWithUserSchema)`
      SELECT
        friends.id as id,
        friends.user_id as user_id,
        friends.created_at as created_at,
        friends.updated_at as updated_at,
        friends.deleted_at as deleted_at,
        json_build_object(
          'id', users.id,
          'username', users.username,
          'email', users.email,
          'firstName', users.first_name,
          'lastName', users.last_name,
          'birthDate', users.birth_date,
          'gender', users.gender
        ) as friend
      FROM
        friends
        JOIN users ON friends.friend_id = users.id
      WHERE
        friends.user_id = ${userId}
      ${
        previousPageLastId && previousPageLastCreatedAtTimestamp
          ? sql.fragment`
          AND
            (friends.id, friends.created_at) > (${previousPageLastId}, ${previousPageLastCreatedAtTimestamp})`
          : sql.fragment``
      }
      GROUP BY
        users.id,
        friends.id
      LIMIT ${limit};
    `);
  } catch (error) {
    logger.error(error, "Error while listing user friends in database.");
    throw new InternalServerError({
      code: "unknown-error-listing-friends",
      message: "Unknown error when trying to list user friends from database",
    });
  }
};
