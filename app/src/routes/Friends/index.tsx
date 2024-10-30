import { Navbar } from "../../components/Navbar";
import { Button } from "@shadcn-ui/components/ui/button";
import { FriendsTabs } from "./components/FriendsTabs";

export const FriendsPage = () => {
  return (
    <div className="flex flex-col w-full px-4 mg:container">
      <Navbar />
      <div className="flex flex-col gap-4 w-full justify-center">
        <h1 className="text-3xl font-bold">Friends</h1>
        <div className="grid grid-cols-1 mg:grid-cols-12 gap-8">
          <div className="grid col-span-1 mg:col-span-8 p-6 dark:bg-zinc-900 bg-zinc-50 rounded-md h-full">
            <FriendsTabs />
          </div>
          <div className="grid col-span-1 mg:col-span-4 gap-8">
            <div className="p-4 dark:bg-zinc-900 bg-zinc-50 rounded-md size-full">
              <h1 className="text-xl font-semibold">Suggested Friends</h1>
              <h2 className="text-sd dark:text-zinc-400">Coming soon...</h2>
            </div>
            <div className="p-4 dark:bg-zinc-900 bg-zinc-50 rounded-md size-full">
              <h1 className="text-xl font-semibold">Find Friends</h1>
              <h2 className="text-sd dark:text-zinc-400">
                Expand your network and discover new connections.
              </h2>
              <Button className="mt-4 w-full">Find Friends</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
