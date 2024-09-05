import { CommonQueryMethods, sql } from "slonik";
import {
  FriendRequestSchema,
  FriendRequestStatus,
} from "../../../../types/friend";
import { logger } from "../../../../logger";
import { InternalServerError } from "../../../../errors/server";

interface UpdateFriendRequestOptions {
  requestId: string;
  status: FriendRequestStatus;
}

export const updateFriendRequest = async (
  database: CommonQueryMethods,
  { requestId, status }: UpdateFriendRequestOptions,
) => {
  try {
    return await database.one(sql.type(FriendRequestSchema)`
      UPDATE
        friend_requests
      SET
        status = ${status},
        updated_at = ${new Date().toISOString()}
      WHERE
        id = ${requestId}
      AND
        deleted_at IS NULL
      RETURNING *;
    `);
  } catch (error) {
    logger.error(error, "Error while updating friend request in database.");
    throw new InternalServerError({
      code: "unknown-error-updating-friend-request",
      message: "Unknown error when updating friend request in database",
    });
  }
};
