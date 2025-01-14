import { CommonQueryMethods, sql } from "slonik";
import {
  SentFriendRequestWithUser,
  SentFriendRequestWithUserSchema,
} from "../../../../types/friend";
import { logger } from "../../../../logger";
import { InternalServerError } from "../../../../errors/server";

interface ListSentFriendRequestsOptions {
  userId: string;
}

export const listSentFriendRequests = async (
  database: CommonQueryMethods,
  { userId }: ListSentFriendRequestsOptions,
): Promise<Readonly<SentFriendRequestWithUser[]>> => {
  try {
    return await database.any(sql.type(SentFriendRequestWithUserSchema)`
      SELECT
        friend_requests.id as id,
        friend_requests.status as status,
        friend_requests.sender_id as sender_id,
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
        ) as receiver
      FROM
        friend_requests
        JOIN profiles ON friend_requests.receiver_id = profiles.user_id
      WHERE
        friend_requests.sender_id = ${userId}
      AND
        friend_requests.status = 'PENDING'
      AND
        friend_requests.deleted_at IS NULL;
    `);
  } catch (error) {
    logger.error(
      error,
      "Error while listing user's sent friend requests in database.",
    );
    throw new InternalServerError({
      code: "unknown-error-listing-sent-friend-requests",
      message:
        "Unknown error when trying to list user's sent friend requests from database",
    });
  }
};
