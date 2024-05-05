import { Button } from "@shadcn-ui/components/ui/button";
import { Link } from "react-router-dom";

export const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen w-full justify-center items-center gap-4">
      <div className="flex flex-col gap-5">
        <h1 className="text-9xl">Thoughts.</h1>
        <h3 className="text-xl">Social Media focused on close connections.</h3>
      </div>
      <div className="flex flex-row w-full gap-10 justify-center">
        <Button asChild>
          <Link to="/login">Login</Link>
        </Button>
        <Button asChild>
          <Link to="/signup">Signup</Link>
        </Button>
      </div>
    </div>
  );
};
