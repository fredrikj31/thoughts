import { CommonQueryMethods } from "slonik";
import { getUserById } from "../../../services/database/queries/getUserById";
import { User } from "../../../types/user";

interface GetUserHandlerOptions {
  database: CommonQueryMethods;
  userId: string;
}

export const getUserHandler = async ({
  database,
  userId,
}: GetUserHandlerOptions): Promise<User> => {
  const user = await getUserById(database, { userId });
  return user;
};
