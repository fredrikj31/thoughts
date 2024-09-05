import { CommonQueryMethods, sql } from "slonik";
import {
  FriendRequestWithUser,
  FriendRequestWithUserSchema,
} from "../../../../types/friend";
import { logger } from "../../../../logger";
import { InternalServerError } from "../../../../errors/server";

interface ListFriendRequestsOptions {
  userId: string;
}

export const listFriendRequests = async (
  database: CommonQueryMethods,
  { userId }: ListFriendRequestsOptions,
): Promise<Readonly<FriendRequestWithUser[]>> => {
  try {
    return await database.any(sql.type(FriendRequestWithUserSchema)`
      SELECT
        friend_requests.id as id,
        friend_requests.status as status,
        friend_requests.receiver_id as receiver_id,
        friend_requests.created_at as created_at,
        friend_requests.updated_at as updated_at,
        friend_requests.deleted_at as deleted_at,
        json_build_object(
          'id', users.id,
          'username', users.username,
          'email', users.email,
          'firstName', users.first_name,
          'lastName', users.last_name,
          'birthDate', users.birth_date,
          'gender', users.gender
        ) as sender
      FROM
        friend_requests
        JOIN users ON friend_requests.sender_id = users.id
      WHERE
        friend_requests.receiver_id = ${userId}
      AND
        friend_requests.deleted_at IS NULL;
    `);
  } catch (error) {
    logger.error(
      error,
      "Error while listing user's friend requests in database.",
    );
    throw new InternalServerError({
      code: "unknown-error-listing-friend-requests",
      message:
        "Unknown error when trying to list user's friend requests from database",
    });
  }
};
