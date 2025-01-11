import { Button } from "@shadcn-ui/components/ui/button";
import { Navbar } from "../../components/Navbar";
import { Separator } from "@shadcn-ui/components/ui/separator";
import { useState } from "react";
import { ProfileSettings } from "./components/ProfileSettings";
import { AccountSettings } from "./components/AccountSettings";

type Tabs = "profile" | "account";

export const SettingsPage = () => {
  const [tab, setTab] = useState<Tabs>("profile");

  return (
    <div className="flex flex-col w-full px-4 mg:container">
      <Navbar />
      <div className="flex flex-col gap-4 pb-4">
        {/* Title */}
        <div className="flex flex-col gap-0.5">
          <h2 className="text-2xl font-bold">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <Separator />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="flex flex-row md:flex-col md:min-w-full">
            <Button
              className="text-center md:justify-start w-full"
              variant={tab === "profile" ? "secondary" : "link"}
              onClick={() => setTab("profile")}
            >
              Profile
            </Button>
            <Button
              className="text-center md:justify-start w-full"
              variant={tab === "account" ? "secondary" : "link"}
              onClick={() => setTab("account")}
            >
              Account
            </Button>
          </div>
          {/* Settings */}
          <div className="md:col-span-3">
            {tab === "profile" && <ProfileSettings />}
            {tab === "account" && <AccountSettings />}
          </div>
        </div>
      </div>
    </div>
  );
};
