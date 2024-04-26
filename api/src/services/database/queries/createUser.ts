import { CommonQueryMethods, sql } from "slonik";
import { User, UserSchema } from "../../../types/user";
import { InternalServerError } from "../../../errors/server";
import { logger } from "../../../logger";

interface CreateUserOptions {
  userId: string;
  username: string;
  email: string;
  hashedPassword: string;
  passwordSalt: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: string;
}

export const createUser = async (
  database: CommonQueryMethods,
  {
    userId,
    username,
    email,
    hashedPassword,
    passwordSalt,
    firstName,
    lastName,
    birthDate,
    gender,
  }: CreateUserOptions,
): Promise<User> => {
  try {
    return await database.one(sql.type(UserSchema)`
      INSERT INTO
        users (
          id,
          username,
          email,
          password,
          password_salt,
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
          ${email},
          ${hashedPassword},
          ${passwordSalt},
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
    logger.error({ error }, "Error while creating user in database.");
    throw new InternalServerError({
      code: "unknown-error-creating-new-user",
      message: "Unknown error when trying to create user",
    });
  }
};
