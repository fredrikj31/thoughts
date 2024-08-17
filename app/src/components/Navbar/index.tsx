import {
  UsersIcon,
  HomeIcon,
  BellIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@shadcn-ui/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@shadcn-ui/components/ui/avatar";
import { Bars3Icon } from "@heroicons/react/24/solid";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@shadcn-ui/components/ui/sheet";
import { NavbarLink } from "./components/NavbarLink";
import { useTheme } from "../../providers/theme";
import { ThemeToggler } from "./components/ThemeToggler";

export const Navbar = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    switch (theme) {
      case "light":
        setTheme("dark");
        break;
      case "dark":
        setTheme("light");
        break;
      default:
        break;
    }
  };

  const links: { text: string; path: string; icon: JSX.Element }[] = [
    {
      text: "Home",
      path: "/",
      icon: <HomeIcon className="size-5 group-hover:text-zinc-300" />,
    },
    {
      text: "Friends",
      path: "/friends",
      icon: <UsersIcon className="size-5 group-hover:text-zinc-300" />,
    },
    {
      text: "Messages",
      path: "/messages",
      icon: <EnvelopeIcon className="size-5 group-hover:text-zinc-300" />,
    },
    {
      text: "Activity",
      path: "/activity",
      icon: <BellIcon className="size-5 group-hover:text-zinc-300" />,
    },
  ];

  return (
    <div className="w-full justify-between py-7 flex flex-row">
      <div className="flex flex-row gap-4 mg:gap-16 items-center">
        {/* Mobile Navbar */}
        <Sheet>
          <SheetTrigger>
            <Bars3Icon className="size-10 block mg:hidden" />
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>
                <span className="text-2xl">Thoughts</span>
              </SheetTitle>
              <SheetDescription className="flex flex-col gap-2">
                {links.map((link, index) => (
                  <NavbarLink
                    key={`mobile-nav-link-${index}`}
                    icon={link.icon}
                    path={link.path}
                    text={link.text}
                  />
                ))}
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
        <div className="flex flex-col">
          <h1 className="text-xl font-bold">Welcome back!</h1>
          <h3 className="text-lg text-zinc-400 mg:block hidden">
            Remember, stay connected!
          </h3>
        </div>
        <div className="hidden flex-row items-center gap-8 mg:flex">
          {links.map((link, index) => (
            <NavbarLink
              key={`desktop-nav-link-${index}`}
              icon={link.icon}
              path={link.path}
              text={link.text}
            />
          ))}
        </div>
      </div>
      {/* Profile Picture (dropdown) and Theme Selector */}
      <div className="flex flex-row gap-2 items-center">
        {/* Theme Selector */}
        <ThemeToggler onClick={() => toggleTheme()} />
        {/* Dropdown Profile Picture */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="size-12">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>John Doe (@johndoe)</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Account</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
