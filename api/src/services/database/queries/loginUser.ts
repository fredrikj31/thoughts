import {
  CommonQueryMethods,
  NotFoundError as SlonikNotFoundError,
  sql,
} from "slonik";
import { generateHash } from "../../../helpers/generateHash";
import { User, UserSchema } from "../../../types/user";
import { config } from "../../../config";
import { logger } from "../../../logger";
import { InternalServerError } from "../../../errors/server";
import { NotFoundError, UnauthorizedError } from "../../../errors/client";

interface LoginUserOptions {
  email: string;
  password: string;
}

export const loginUser = async (
  database: CommonQueryMethods,
  { email, password }: LoginUserOptions,
): Promise<User> => {
  const user = await database
    .one(
      sql.type(UserSchema)`
      SELECT
        *
      FROM
        users
      WHERE
        email = ${email};
    `,
    )
    .catch((error) => {
      if (error instanceof SlonikNotFoundError) {
        logger.info({ email }, "No user found with that email");
        throw new NotFoundError({
          code: "user-not-found",
          message: "No user with the provided email was found",
        });
      }

      logger.error({ email, error }, "Error while logging user in");
      throw new InternalServerError({
        code: "error-getting-user-with-credentials",
        message:
          "Unknown error occurred when trying to get user with provided credentials",
      });
    });

  const hashedPassword = generateHash({
    password,
    userSalt: user.passwordSalt,
    salt: config.tokens.passwordSalt,
  });

  if (hashedPassword !== user.password) {
    logger.info(
      { email },
      "The provided password didn't match hashed password in database",
    );
    throw new UnauthorizedError({
      code: "incorrect-password",
      message: "The provided password was incorrect",
    });
  }

  return user;
};
