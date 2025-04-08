import { CommonQueryMethods } from "slonik";
import { getProfileById } from "../../../services/database/queries/profiles/getProfileById";
import { Profile } from "../../../types/profiles";

interface GetUserProfileByIdHandlerOptions {
  database: CommonQueryMethods;
  userId: string;
}

export const getUserProfileByIdHandler = async ({
  database,
  userId,
}: GetUserProfileByIdHandlerOptions): Promise<Profile> => {
  const profile = await getProfileById(database, { userId });
  return profile;
};
