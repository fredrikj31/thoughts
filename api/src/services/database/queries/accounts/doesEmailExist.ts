import { CommonQueryMethods, sql } from "slonik";
import { logger } from "../../../../logger";
import { InternalServerError } from "../../../../errors/server";
import { AccountSchema } from "../../../../types/account";

interface DoesEmailExistOptions {
  email: string;
}

export const doesEmailExist = async (
  database: CommonQueryMethods,
  { email }: DoesEmailExistOptions,
): Promise<boolean> => {
  const user = await database
    .any(
      sql.type(AccountSchema)`
      SELECT
        *
      FROM
        accounts
      WHERE
        email = ${email};
    `,
    )
    .catch((error) => {
      logger.error({ error }, "Error while checking if email exists");
      throw new InternalServerError({
        code: "failed-checking-email-exists",
        message: "Unknown error occurred when checking if email exists",
      });
    });

  if (user.length === 0) {
    return false;
  }
  return true;
};
