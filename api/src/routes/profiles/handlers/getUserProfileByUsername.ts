import { CommonQueryMethods } from "slonik";
import { Profile } from "../../../types/profiles";
import { getProfileByUsername } from "../../../services/database/queries/profiles/getProfileByUsername";

interface GetUserProfileByUsernameHandlerOptions {
  database: CommonQueryMethods;
  username: string;
}

export const getUserProfileByUsernameHandler = async ({
  database,
  username,
}: GetUserProfileByUsernameHandlerOptions): Promise<Profile> => {
  const profile = await getProfileByUsername(database, { username });
  return profile;
};
