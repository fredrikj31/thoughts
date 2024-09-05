import {
  CommonQueryMethods,
  ForeignKeyIntegrityConstraintViolationError,
  sql,
} from "slonik";
import { FriendRequest, FriendRequestSchema } from "../../../../types/friend";
import { randomUUID } from "crypto";
import { logger } from "../../../../logger";
import { InternalServerError } from "../../../../errors/server";
import { BadRequestError } from "../../../../errors/client";

interface CreateFriendRequestOptions {
  userId: string;
  friendId: string;
}

export const createFriendRequest = async (
  database: CommonQueryMethods,
  { userId, friendId }: CreateFriendRequestOptions,
): Promise<FriendRequest> => {
  try {
    return await database.one(sql.type(FriendRequestSchema)`
      INSERT INTO
        friend_requests
      (
        id,
        sender_id,
        receiver_id,
        status,
        created_at,
        updated_at,
        deleted_at
      )
      VALUES
      (
        ${randomUUID()},
        ${userId},
        ${friendId},
        'PENDING',
        ${new Date().toISOString()},
        null,
        null
      )
      RETURNING *;
    `);
  } catch (error) {
    if (error instanceof ForeignKeyIntegrityConstraintViolationError) {
      if (error.constraint === "friend_requests_receiver_id_references") {
        throw new BadRequestError({
          code: "friend-request-user-id-does-not-exists",
          message: "Could not find a user with that id",
        });
      }
    }

    logger.error(error, "Error while creating friend request.");
    throw new InternalServerError({
      code: "unknown-error-creating-friend-request",
      message: "Unknown error when trying to create friend request",
    });
  }
};
