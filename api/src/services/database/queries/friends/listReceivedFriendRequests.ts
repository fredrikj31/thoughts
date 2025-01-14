import { CommonQueryMethods, sql } from "slonik";
import {
  ReceivedFriendRequestWithUser,
  ReceivedFriendRequestWithUserSchema,
} from "../../../../types/friend";
import { logger } from "../../../../logger";
import { InternalServerError } from "../../../../errors/server";

interface ListReceivedFriendRequestsOptions {
  userId: string;
}

export const listReceivedFriendRequests = async (
  database: CommonQueryMethods,
  { userId }: ListReceivedFriendRequestsOptions,
): Promise<Readonly<ReceivedFriendRequestWithUser[]>> => {
  try {
    return await database.any(sql.type(ReceivedFriendRequestWithUserSchema)`
      SELECT
        friend_requests.id as id,
        friend_requests.status as status,
        friend_requests.receiver_id as receiver_id,
        friend_requests.created_at as created_at,
        friend_requests.updated_at as updated_at,
        friend_requests.deleted_at as deleted_at,
        json_build_object(
          'userId', profiles.user_id,
          'username', profiles.username,
          'firstName', profiles.first_name,
          'lastName', profiles.last_name,
          'birthDate', profiles.birth_date,
          'gender', profiles.gender
        ) as sender
      FROM
        friend_requests
        JOIN profiles ON friend_requests.sender_id = profiles.user_id
      WHERE
        friend_requests.receiver_id = ${userId}
      AND
        friend_requests.status = 'PENDING'
      AND
        friend_requests.deleted_at IS NULL;
    `);
  } catch (error) {
    logger.error(
      error,
      "Error while listing user's received friend requests in database.",
    );
    throw new InternalServerError({
      code: "unknown-error-listing-received-friend-requests",
      message:
        "Unknown error when trying to list user's received friend requests from database",
    });
  }
};
