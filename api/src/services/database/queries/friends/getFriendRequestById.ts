import {
  CommonQueryMethods,
  NotFoundError as SlonikNotFoundError,
  sql,
} from "slonik";
import { FriendRequestSchema } from "../../../../types/friend";
import { logger } from "../../../../logger";
import { InternalServerError } from "../../../../errors/server";
import { NotFoundError } from "../../../../errors/client";

interface GetFriendRequestByIdOptions {
  requestId: string;
}

export const getFriendRequestById = async (
  database: CommonQueryMethods,
  { requestId }: GetFriendRequestByIdOptions,
) => {
  try {
    return await database.one(sql.type(FriendRequestSchema)`
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
        id = ${requestId}
      AND
        deleted_at IS NULl;
    `);
  } catch (error) {
    if (error instanceof SlonikNotFoundError) {
      throw new NotFoundError({
        code: "friend-request-by-id-not-found",
        message: "Friend request with specified id was not found",
      });
    }

    logger.error(error, "Error while getting friend request by id.");
    throw new InternalServerError({
      code: "unknown-error-getting-friend-request-by-id",
      message: "Unknown error when trying to get friend request by id",
    });
  }
};
