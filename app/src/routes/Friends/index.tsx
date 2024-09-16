import { Link } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import { Button } from "@shadcn-ui/components/ui/button";
import { useListFriends } from "../../api/friends/listFriends/useListFriends";
import { FriendListItem } from "./components/FriendListItem";

export const FriendsPage = () => {
  const { data: friends, isFetching: isFriendsLoading } = useListFriends();

  return (
    <div className="flex flex-col mg:gap-7 gap-4 container">
      <Navbar />
      <div className="flex flex-col gap-12 w-full">
        <div className="flex flex-row justify-between w-full">
          <h1 className="text-2xl font-bold">Friends:</h1>
          <Link to={"/friends/requests"}>
            <Button>Requests</Button>
          </Link>
        </div>
        <div className="flex flex-col gap-2 w-full items-center">
          {!isFriendsLoading && friends ? (
            friends.length > 0 ? (
              friends.map((friend, index) => (
                <FriendListItem key={`friend-${index}`} friend={friend} />
              ))
            ) : (
              <div className="w-1/2 h-20 rounded dark:bg-zinc-900 bg-zinc-100 flex flex-row justify-between p-4 items-center">
                <span className="text-lg">No friends yet...</span>
              </div>
            )
          ) : (
            <div className="w-1/2 rounded h-20 animate-pulse dark:bg-zinc-900 bg-zinc-100" />
          )}
        </div>
      </div>
    </div>
  );
};
