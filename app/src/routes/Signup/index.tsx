import { Button } from "@shadcn-ui/components/ui/button";
import { Input } from "@shadcn-ui/components/ui/input";
import { Label } from "@shadcn-ui/components/ui/label";
import { DatePicker } from "../../components/DatePicker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shadcn-ui/components/ui/select";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { Checkbox } from "@shadcn-ui/components/ui/checkbox";

export const SignupPage = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);

  return (
    <div className="min-h-screen grid grid-cols-2">
      <div className="bg-zinc-200 dark:bg-zinc-900 w-full p-16 flex flex-col justify-between">
        <div className="flex flex-row items-center gap-2">
          <ChatBubbleLeftRightIcon className="size-12 text-black dark:text-white" />
          <h1 className="text-5xl font-semibold">Thoughts</h1>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-2xl italic">
            “Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eu
            sapien et justo porttitor mollis eget nec justo. Donec rutrum ligula
            augue, vitae euismod justo convallis vitae.”
          </p>
          <span className="text-xl text-zinc-700 dark:text-zinc-400">
            - John Doe
          </span>
        </div>
      </div>
      <div className="bg-zinc-300 dark:bg-zinc-950 w-full p-8 flex justify-center items-center">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold text-center">
              Create an account
            </h1>
            <h3 className="text-zinc-700 dark:text-zinc-400 text-center">
              Fill out the form below to create an account
            </h3>
          </div>
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
          />
          <Label className="sr-only" htmlFor="email">
            Username
          </Label>
          <Input
            id="username"
            placeholder="Username"
            type="text"
            autoCapitalize="none"
            autoCorrect="off"
          />
          <div className="flex flex-row gap-2">
            <Label className="sr-only" htmlFor="firstName">
              First Name
            </Label>
            <Input
              id="firstName"
              placeholder="First Name"
              autoComplete="given-name"
              type="text"
            />
            <Label className="sr-only" htmlFor="lastName">
              Last Name
            </Label>
            <Input
              id="lastName"
              placeholder="Last Name"
              autoComplete="family-name"
              type="text"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <DatePicker
              date={date}
              toDate={new Date()}
              onDateSelected={(date) => setDate(date)}
            />
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MALE">Male</SelectItem>
                <SelectItem value="FEMALE">Female</SelectItem>
                <SelectItem value="PREFER_NOT_TO_SAY">
                  Prefer not to say
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-row gap-2 items-start">
            <div className="mt-0.5">
              <Checkbox />
            </div>
            <div className="flex flex-col">
              <span>Accept terms and conditions</span>
              <span className="text-zinc-700 dark:text-zinc-400 text-sm">
                You agree to our Terms of Service and Privacy Policy.
              </span>
            </div>
          </div>
          <Button>Sign Up</Button>
        </div>
      </div>
    </div>
  );
};
