import { CommonQueryMethods } from "slonik";
import { createUser } from "../../../services/database/queries/createUser";
import { doesEmailExist } from "../../../services/database/queries/doesEmailExist";
import { User } from "../../../types/user";
import { ConflictError } from "../../../errors/client";
import { randomBytes, randomUUID } from "crypto";
import { generateHash } from "../../../helpers/generateHash";
import { config } from "../../../config";
import { doesUsernameExist } from "../../../services/database/queries/doesUsernameExist";

interface SignupHandlerOptions {
  database: CommonQueryMethods;
  user: {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    gender: string;
  };
}

export const signupHandler = async ({
  database,
  user,
}: SignupHandlerOptions): Promise<User> => {
  const isEmailTaken = await doesEmailExist(database, { email: user.email });
  if (isEmailTaken) {
    throw new ConflictError({
      code: "email-already-exists",
      message: "There is already a user signed up with that email",
    });
  }

  const isUsernameTaken = await doesUsernameExist(database, {
    username: user.username,
  });
  if (isUsernameTaken) {
    throw new ConflictError({
      code: "username-already-exists",
      message: "There is already a user signed up with that username",
    });
  }

  const userId = randomUUID();
  const userSalt = randomBytes(20).toString("hex");
  const hashedPassword = generateHash({
    password: user.password,
    userSalt,
    salt: config.tokens.passwordSalt,
  });

  const createdUser = await createUser(database, {
    userId,
    username: user.username,
    email: user.email,
    hashedPassword,
    passwordSalt: userSalt,
    firstName: user.firstName,
    lastName: user.lastName,
    birthDate: user.birthDate,
    gender: user.gender,
  });
  return createdUser;
};
