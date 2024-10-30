import { useListFriends } from "../../../../api/friends/listFriends/useListFriends";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@shadcn-ui/components/ui/tabs";
import { useListSentFriendRequests } from "../../../../api/friends/listSentFriendRequests/useListSentFriendRequests";
import { useListReceivedFriendRequests } from "../../../../api/friends/listReceivedFriendRequests/useListReceivedFriendRequests";
import { useAcceptOrDeclineFriendRequest } from "../../../../api/friends/acceptOrDeclineFriendRequest/useAcceptOrDeclineFriendRequest";
import { ReceivedRequestsTab } from "./components/ReceivedRequestsTab";
import { FriendsTab } from "./components/FriendsTab";
import { useDeleteFriendRequest } from "../../../../api/friends/deleteFriendRequest/useDeleteFriendRequest";
import { SentRequestsTab } from "./components/SentRequestsTab";

export const FriendsTabs = () => {
  const { data: friends, refetch: refetchFriends } = useListFriends();

  const {
    data: receivedFriendRequests,
    refetch: refetchReceivedFriendRequests,
  } = useListReceivedFriendRequests();
  const { mutate: acceptOrDeclineFriendRequest } =
    useAcceptOrDeclineFriendRequest();

  const { data: sentFriendRequests, refetch: refetchSentFriendRequests } =
    useListSentFriendRequests();
  const { mutate: deleteFriendRequest } = useDeleteFriendRequest();

  return (
    <Tabs defaultValue="friends">
      <TabsList className="w-full h-fit flex flex-col mg:flex-row ">
        <TabsTrigger className="w-full" value="friends">
          Friends {friends && `(${friends.length})`}
        </TabsTrigger>
        <TabsTrigger className="w-full" value="received">
          Received Requests{" "}
          {receivedFriendRequests && `(${receivedFriendRequests.length})`}
        </TabsTrigger>
        <TabsTrigger className="w-full" value="sent">
          Sent Requests {sentFriendRequests && `(${sentFriendRequests.length})`}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="friends">
        <FriendsTab friends={friends ?? []} />
      </TabsContent>
      <TabsContent value="received">
        <ReceivedRequestsTab
          receivedFriendRequests={receivedFriendRequests ?? []}
          acceptOrDeclineFriendRequest={({ requestId, status }) => {
            acceptOrDeclineFriendRequest(
              { requestId, status },
              {
                onSuccess: () => {
                  refetchReceivedFriendRequests();
                  if (status === "accepted") {
                    refetchFriends();
                  }
                },
              },
            );
          }}
        />
      </TabsContent>
      <TabsContent value="sent">
        <SentRequestsTab
          sentFriendRequests={sentFriendRequests ?? []}
          deleteFriendRequest={({ requestId }) => {
            deleteFriendRequest(
              { requestId },
              { onSuccess: () => refetchSentFriendRequests() },
            );
          }}
        />
      </TabsContent>
    </Tabs>
  );
};
