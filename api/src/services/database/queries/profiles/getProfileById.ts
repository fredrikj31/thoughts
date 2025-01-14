import {
  CommonQueryMethods,
  sql,
  NotFoundError as SlonikNotFoundError,
} from "slonik";
import { logger } from "../../../../logger";
import { InternalServerError } from "../../../../errors/server";
import { NotFoundError } from "../../../../errors/client";
import { Profile, ProfileSchema } from "../../../../types/profiles";

interface GetProfileByIdOptions {
  userId: string;
}

export const getProfileById = async (
  database: CommonQueryMethods,
  { userId }: GetProfileByIdOptions,
): Promise<Profile> => {
  try {
    return await database.one(sql.type(ProfileSchema)`
      SELECT
        *
      FROM
        profiles
      WHERE
        user_id = ${userId};
    `);
  } catch (error) {
    if (error instanceof SlonikNotFoundError) {
      throw new NotFoundError({
        code: "profile-not-found",
        message: "Profile with provided id, was not found in database",
      });
    }

    logger.error({ error }, "Error while getting profile in database.");
    throw new InternalServerError({
      code: "unknown-error-getting-profile-by-id",
      message: "Unknown error when trying to get profile by id from database",
    });
  }
};
