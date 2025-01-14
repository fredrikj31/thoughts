import { CommonQueryMethods, sql } from "slonik";
import { Profile, ProfileSchema } from "../../../../types/profiles";
import { InternalServerError } from "../../../../errors/server";
import { logger } from "../../../../logger";

interface CreateProfileOptions {
  userId: string;
  username: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: string;
}

export const createProfile = async (
  database: CommonQueryMethods,
  {
    userId,
    username,
    firstName,
    lastName,
    birthDate,
    gender,
  }: CreateProfileOptions,
): Promise<Profile> => {
  try {
    return await database.one(sql.type(ProfileSchema)`
      INSERT INTO
        profiles (
          user_id,
          username,
          first_name,
          last_name,
          birth_date,
          gender,
          created_at,
          updated_at,
          deleted_at
        )
      VALUES
        (
          ${userId},
          ${username},
          ${firstName},
          ${lastName},
          ${birthDate},
          ${gender},
          ${new Date().toISOString()},
          NULL,
          NULL
        )
      RETURNING *;
    `);
  } catch (error) {
    logger.error({ error }, "Error while creating profile in database.");
    throw new InternalServerError({
      code: "unknown-error-creating-profile",
      message: "Unknown error when trying to create profile",
    });
  }
};
