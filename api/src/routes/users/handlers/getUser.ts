import { CommonQueryMethods } from "slonik";
import { getProfileById } from "../../../services/database/queries/profiles/getProfileById";
import { Profile } from "../../../types/profiles";

interface GetUserHandlerOptions {
  database: CommonQueryMethods;
  userId: string;
}

export const getUserHandler = async ({
  database,
  userId,
}: GetUserHandlerOptions): Promise<Profile> => {
  const user = await getProfileById(database, { userId });
  return user;
};
