import { CommonQueryMethods } from "slonik";
import { listFriends } from "../../../services/database/queries/friends/listFriends";
import { FriendWithUser } from "../../../types/friend";

interface ListFriendsHandlerOptions {
  database: CommonQueryMethods;
  userId: string;
}

export const listFriendsHandler = async ({
  database,
  userId,
}: ListFriendsHandlerOptions): Promise<Readonly<FriendWithUser[]>> => {
  const friends = await listFriends(database, {
    userId,
  });

  return friends;
};
