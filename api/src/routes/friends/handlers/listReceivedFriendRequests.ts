import { CommonQueryMethods } from "slonik";
import { listReceivedFriendRequests } from "../../../services/database/queries/friends/listReceivedFriendRequests";

interface ListReceivedFriendRequestsHandlerOptions {
  database: CommonQueryMethods;
  userId: string;
}

export const listReceivedFriendRequestsHandler = async ({
  database,
  userId,
}: ListReceivedFriendRequestsHandlerOptions) => {
  const friendRequests = await listReceivedFriendRequests(database, {
    userId,
  });

  return friendRequests;
};
