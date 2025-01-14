import { CommonQueryMethods } from "slonik";
import { getProfileById } from "../../../services/database/queries/profiles/getProfileById";
import { Profile } from "../../../types/profiles";

interface GetUserProfileHandlerOptions {
  database: CommonQueryMethods;
  userId: string;
}

export const getUserProfileHandler = async ({
  database,
  userId,
}: GetUserProfileHandlerOptions): Promise<Profile> => {
  const profile = await getProfileById(database, { userId });
  return profile;
};
