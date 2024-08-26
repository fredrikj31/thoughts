import { CommonQueryMethods } from "slonik";
import { listFriends } from "../../../services/database/queries/friends/listFriends";
import { FriendWithUser } from "../../../types/friend";

interface ListFriendsHandlerOptions {
  database: CommonQueryMethods;
  userId: string;
  pageToken: string | undefined;
  limit: number;
}

export const listFriendsHandler = async ({
  database,
  userId,
  pageToken,
  limit,
}: ListFriendsHandlerOptions): Promise<Readonly<FriendWithUser[]>> => {
  const friends = await listFriends(database, {
    userId,
    pageToken,
    limit,
  });

  return friends;
};
