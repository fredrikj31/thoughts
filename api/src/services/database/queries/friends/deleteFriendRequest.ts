import {
  CommonQueryMethods,
  NotFoundError as SlonikNotFoundError,
  sql,
} from "slonik";
import { FriendRequest, FriendRequestSchema } from "../../../../types/friend";
import { logger } from "../../../../logger";
import { InternalServerError } from "../../../../errors/server";
import { NotFoundError } from "../../../../errors/client";

interface DeleteFriendRequestOptions {
  requestId: string;
}

export const deleteFriendRequest = async (
  database: CommonQueryMethods,
  { requestId }: DeleteFriendRequestOptions,
): Promise<FriendRequest> => {
  try {
    return await database.one(sql.type(FriendRequestSchema)`
      UPDATE
        friend_requests
      SET
        deleted_at = ${new Date().toISOString()}
      WHERE
        id = ${requestId}
      RETURNING *;
    `);
  } catch (error) {
    if (error instanceof SlonikNotFoundError) {
      throw new NotFoundError({
        code: "delete-friend-request-by-id-not-found",
        message: "Friend request with specified id was not found",
      });
    }

    logger.error(error, "Error while deleting friend request by id.");
    throw new InternalServerError({
      code: "unknown-error-deleting-friend-request-by-id",
      message: "Unknown error when trying to delete friend request by id",
    });
  }
};
