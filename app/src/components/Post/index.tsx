import {
  HandThumbUpIcon as SolidHandThumbUpIcon,
  HeartIcon as SolidHeartIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/solid";
import {
  HandThumbUpIcon as OutlineHandThumbUpIcon,
  HeartIcon as OutlineHeartIcon,
} from "@heroicons/react/24/outline";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@shadcn-ui/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@shadcn-ui/components/ui/card";
import { Link } from "react-router-dom";

export const Post = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row items-center gap-2">
          <Avatar className="size-10">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <Link
              to={"/profile/uggabugga"}
              className="font-semibold text-base hover:text-zinc-300"
            >
              John Doe (@johndoe)
            </Link>
            <span className="text-sm text-zinc-400">2024-05-09 - 14:47</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent erat
          diam, vestibulum id hendrerit eget, congue gravida diam. Maecenas
          cursus pulvinar risus, vel tincidunt lectus pellentesque at.
        </p>
        <div className="flex flex-row justify-evenly gap-4 w-full flex-wrap">
          <img
            className="size-full rounded-lg aspect-video flex-[1_0_40%]"
            src="https://placehold.co/250x140"
          />
          <img
            className="size-full rounded-lg aspect-video flex-[1_0_40%]"
            src="https://placehold.co/250x140"
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-row justify-between">
        <div className="flex flex-row gap-2">
          <button className="group">
            <OutlineHandThumbUpIcon className="size-6 block group-hover:hidden" />
            <SolidHandThumbUpIcon className="size-6 hidden group-hover:block" />
          </button>
          <button className="group">
            <OutlineHeartIcon className="size-6 block group-hover:hidden" />
            <SolidHeartIcon className="size-6 hidden group-hover:block" />
          </button>
        </div>
        <Link to={`/post/uggabugga`} className="group flex flex-row gap-2">
          <ChatBubbleLeftRightIcon className="size-6 group-hover:text-zinc-300" />
          <span className="group-hover:text-zinc-300">2 comments</span>
        </Link>
      </CardFooter>
    </Card>
  );
};
