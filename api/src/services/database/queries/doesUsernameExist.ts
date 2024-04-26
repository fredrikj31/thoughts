import { CommonQueryMethods, sql } from "slonik";
import { UserSchema } from "../../../types/user";
import { logger } from "../../../logger";
import { InternalServerError } from "../../../errors/server";

interface DoesUsernameExistOptions {
  username: string;
}

export const doesUsernameExist = async (
  database: CommonQueryMethods,
  { username }: DoesUsernameExistOptions,
): Promise<boolean> => {
  const user = await database
    .any(
      sql.type(UserSchema)`
      SELECT
        *
      FROM
        users
      WHERE
        username = ${username};
    `,
    )
    .catch((error) => {
      logger.error({ error }, "Error while checking if username exists");
      throw new InternalServerError({
        code: "failed-checking-username-exists",
        message: "Unknown error occurred when checking if username exists",
      });
    });

  if (user.length === 0) {
    return false;
  }
  return true;
};
