import { CommonQueryMethods, sql } from "slonik";
import { Friend, FriendSchema } from "../../../../types/friend";
import { randomUUID } from "crypto";
import { logger } from "../../../../logger";
import { InternalServerError } from "../../../../errors/server";

interface CreateFriendOptions {
  userId: string;
  friendId: string;
}

export const createFriend = async (
  database: CommonQueryMethods,
  { userId, friendId }: CreateFriendOptions,
): Promise<Friend> => {
  try {
    return await database.one(sql.type(FriendSchema)`
      INSERT INTO
        friends
      (
        id,
        user_id,
        friend_id,
        created_at,
        updated_at,
        deleted_at
      )
      VALUES
      (
        ${randomUUID()},
        ${userId},
        ${friendId},
        ${new Date().toISOString()},
        null,
        null
      )
      RETURNING *;
    `);
  } catch (error) {
    logger.error(error, "Error while creating friend.");
    throw new InternalServerError({
      code: "unknown-error-creating-friend",
      message: "Unknown error when trying to create friend",
    });
  }
};
