import { Navbar } from "../components/Navbar";
import { Post } from "../components/Post";

export const HomePage = () => {
  return (
    <div className="flex flex-col mg:gap-7 gap-4 container">
      <Navbar />
      {/* Feed */}
      <div className="flex flex-col self-center max-w-3xl gap-4">
        {/* Post */}
        <Post />
      </div>
    </div>
  );
};
