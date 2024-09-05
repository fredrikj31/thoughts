import { CommonQueryMethods, sql } from "slonik";
import { FriendRequestSchema } from "../../../../types/friend";
import { logger } from "../../../../logger";
import { InternalServerError } from "../../../../errors/server";

interface GetFriendRequestByFriendIdOptions {
  userId: string;
  friendId: string;
}

export const getFriendRequestByFriendId = async (
  database: CommonQueryMethods,
  { userId, friendId }: GetFriendRequestByFriendIdOptions,
) => {
  try {
    return await database.any(sql.type(FriendRequestSchema)`
      SELECT
        id,
        status,
        sender_id,
        receiver_id,
        created_at,
        updated_at,
        deleted_at
      FROM
        friend_requests
      WHERE
        sender_id = ${userId}
      AND
        receiver_id = ${friendId}
      AND
        deleted_at IS NULL;
    `);
  } catch (error) {
    logger.error(error, "Error while listing user's sent friend requests.");
    throw new InternalServerError({
      code: "unknown-error-listing-user-sent-friend-requests",
      message: "Unknown error when trying to list user's sent friend requests",
    });
  }
};
