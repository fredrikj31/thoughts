import { CommonQueryMethods, sql } from "slonik";
import { logger } from "../../../../logger";
import { InternalServerError } from "../../../../errors/server";
import { Account, AccountSchema } from "../../../../types/account";

interface CreateAccountOptions {
  userId: string;
  email: string;
  hashedPassword: string;
  passwordSalt: string;
}

export const createAccount = async (
  database: CommonQueryMethods,
  { userId, email, hashedPassword, passwordSalt }: CreateAccountOptions,
): Promise<Account> => {
  return await database
    .one(
      sql.type(AccountSchema)`
      INSERT INTO
        accounts (
          user_id,
          email,
          password,
          password_salt,
          created_at,
          updated_at,
          deleted_at
        )
      VALUES
        (
          ${userId},
          ${email},
          ${hashedPassword},
          ${passwordSalt},
          ${new Date().toISOString()},
          NULL,
          NULL
        )
      RETURNING *;
    `,
    )
    .catch((error) => {
      logger.error({ error }, "Error while creating account");
      throw new InternalServerError({
        code: "failed-creating-account",
        message: "Unknown error occurred when creating account",
      });
    });
};
