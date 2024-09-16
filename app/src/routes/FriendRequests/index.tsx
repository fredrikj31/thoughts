import { useListReceivedFriendRequests } from "../../api/friends/listReceivedFriendRequests/useListReceivedFriendRequests";
import { useListSentFriendRequests } from "../../api/friends/listSentFriendRequests/useListSentFriendRequests";
import { Navbar } from "../../components/Navbar";
import { ReceivedFriendRequestListItem } from "./components/ReceivedFriendRequestListItem";
import { SentFriendRequestListItem } from "./components/SentFriendRequestListItem";

export const FriendRequestsPage = () => {
  const {
    data: receivedFriendRequests,
    isFetching: isReceivedFriendRequestsLoading,
    refetch: refetchReceivedFriendRequests,
  } = useListReceivedFriendRequests();

  const {
    data: sentFriendRequests,
    isFetching: isSentFriendRequestsLoading,
    refetch: refetchSentFriendRequests,
  } = useListSentFriendRequests();

  return (
    <div className="flex flex-col mg:gap-7 gap-4 container">
      <Navbar />
      <div className="flex flex-row gap-12 w-full">
        <div className="flex flex-col gap-2 w-full">
          <h1 className="text-2xl font-bold">Received:</h1>
          {!isReceivedFriendRequestsLoading && receivedFriendRequests ? (
            receivedFriendRequests.length > 0 ? (
              receivedFriendRequests.map((receivedFriendRequest, index) => (
                <ReceivedFriendRequestListItem
                  key={`received-friend-request-${index}`}
                  friendRequest={receivedFriendRequest}
                  refetchFriendRequests={() => refetchReceivedFriendRequests()}
                />
              ))
            ) : (
              <div className="w-full h-20 rounded dark:bg-zinc-900 bg-zinc-100 flex flex-row justify-between p-4 items-center">
                <span className="text-lg">No friend requests received...</span>
              </div>
            )
          ) : (
            <div className="w-full h-20 animate-pulse dark:bg-zinc-900 bg-zinc-100" />
          )}
        </div>
        <div className="flex flex-col gap-2 w-full">
          <h1 className="text-2xl font-bold">Sent:</h1>
          {!isSentFriendRequestsLoading && sentFriendRequests ? (
            sentFriendRequests.length > 0 ? (
              sentFriendRequests.map((sentFriendRequest, index) => (
                <SentFriendRequestListItem
                  key={`sent-friend-request-${index}`}
                  friendRequest={sentFriendRequest}
                  refetchFriendRequests={() => refetchSentFriendRequests()}
                />
              ))
            ) : (
              <div className="w-full h-20 rounded dark:bg-zinc-900 bg-zinc-100 flex flex-row justify-between p-4 items-center">
                <span className="text-lg">No friend requests sent...</span>
              </div>
            )
          ) : (
            <div className="w-full h-20 animate-pulse dark:bg-zinc-900 bg-zinc-100" />
          )}
        </div>
      </div>
    </div>
  );
};
