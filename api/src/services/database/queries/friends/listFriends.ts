import { CommonQueryMethods, sql } from "slonik";
import { FriendWithUser, FriendWithUserSchema } from "../../../../types/friend";
import { logger } from "../../../../logger";
import { InternalServerError } from "../../../../errors/server";

interface ListFriendsOptions {
  userId: string;
}

export const listFriends = async (
  database: CommonQueryMethods,
  { userId }: ListFriendsOptions,
): Promise<Readonly<FriendWithUser[]>> => {
  try {
    return await database.any(sql.type(FriendWithUserSchema)`
      SELECT
        friends.id as id,
        friends.user_id as user_id,
        friends.created_at as created_at,
        friends.updated_at as updated_at,
        friends.deleted_at as deleted_at,
        json_build_object(
          'userId', profiles.user_id,
          'username', profiles.username,
          'firstName', profiles.first_name,
          'lastName', profiles.last_name,
          'birthDate', profiles.birth_date,
          'gender', profiles.gender
        ) as friend
      FROM
        friends
        JOIN profiles ON friends.friend_id = profiles.user_id
      WHERE
        friends.user_id = ${userId};
    `);
  } catch (error) {
    logger.error(error, "Error while listing user friends in database.");
    throw new InternalServerError({
      code: "unknown-error-listing-friends",
      message: "Unknown error when trying to list user friends from database",
    });
  }
};
