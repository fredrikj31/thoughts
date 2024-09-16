import { CommonQueryMethods } from "slonik";
import { listSentFriendRequests } from "../../../services/database/queries/friends/listSentFriendRequests";

interface ListFriendRequestsHandlerOptions {
  database: CommonQueryMethods;
  userId: string;
}

export const listSentFriendRequestsHandler = async ({
  database,
  userId,
}: ListFriendRequestsHandlerOptions) => {
  const friendRequests = await listSentFriendRequests(database, {
    userId,
  });

  return friendRequests;
};
