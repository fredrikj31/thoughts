import { Button } from "@shadcn-ui/components/ui/button";
import { Input } from "@shadcn-ui/components/ui/input";
import { Label } from "@shadcn-ui/components/ui/label";
import { useToast } from "@shadcn-ui/components/ui/use-toast";
import { useState } from "react";
import { useAuth } from "../../providers/auth";

export const LoginPage = () => {
  const { toast } = useToast();
  const auth = useAuth();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const login = () => {
    if (!email || !password) {
      toast({
        title: "Empty fields!",
        description: "Please fill out all the fields.",
      });
      return;
    }

    auth.login({
      email,
      password,
    });
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <div className="flex flex-col gap-4 w-80">
        <div className="flex flex-col gap-2 items-center">
          <h1 className="text-2xl font-bold">Login</h1>
          <h3 className="text-lg text-zinc-600">Log into your account</h3>
        </div>
        <div className="flex flex-col gap-2">
          <Label className="sr-only" htmlFor="email">
            Email
          </Label>
          <Input
            id="email"
            placeholder="Email"
            type="email"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <Label className="sr-only" htmlFor="password">
            Password
          </Label>
          <Input
            id="password"
            placeholder="Password"
            type="password"
            autoCapitalize="none"
            autoCorrect="off"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
        </div>
        <Button onClick={login}>Login</Button>
      </div>
    </div>
  );
};
