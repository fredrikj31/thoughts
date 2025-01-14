import { CommonQueryMethods } from "slonik";
import { createProfile } from "../../../services/database/queries/profiles/createProfile";
import { doesEmailExist } from "../../../services/database/queries/accounts/doesEmailExist";
import { Profile } from "../../../types/profiles";
import { ConflictError } from "../../../errors/client";
import { randomBytes, randomUUID } from "crypto";
import { generateHash } from "../../../helpers/generateHash";
import { config } from "../../../config";
import { doesUsernameExist } from "../../../services/database/queries/profiles/doesUsernameExist";
import { Account } from "../../../types/account";
import { createAccount } from "../../../services/database/queries/accounts/createAccount";

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
}: SignupHandlerOptions): Promise<
  Pick<Account, "userId" | "email"> &
    Omit<Profile, "userId" | "createdAt" | "updatedAt" | "deletedAt">
> => {
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

  const { email } = await createAccount(database, {
    userId,
    email: user.email,
    hashedPassword,
    passwordSalt: userSalt,
  });

  const { username, firstName, lastName, birthDate, gender } =
    await createProfile(database, {
      userId,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      birthDate: user.birthDate,
      gender: user.gender,
    });

  return {
    userId,
    email,
    username,
    firstName,
    lastName,
    birthDate,
    gender,
  };
};
