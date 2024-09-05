import { CommonQueryMethods } from "slonik";
import { listFriendRequests } from "../../../services/database/queries/friends/listFriendRequests";

interface ListFriendRequestsHandlerOptions {
  database: CommonQueryMethods;
  userId: string;
}

export const listFriendRequestsHandler = async ({
  database,
  userId,
}: ListFriendRequestsHandlerOptions) => {
  const friendRequests = await listFriendRequests(database, {
    userId,
  });

  return friendRequests;
};
