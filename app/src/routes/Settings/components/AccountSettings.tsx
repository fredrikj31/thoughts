import { Separator } from "@shadcn-ui/components/ui/separator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@shadcn-ui/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@shadcn-ui/components/ui/form";
import { Input } from "@shadcn-ui/components/ui/input";
import { Skeleton } from "@shadcn-ui/components/ui/skeleton";
import { useEffect, useMemo } from "react";
import { TriangleAlert } from "lucide-react";
import { useGetUserAccount } from "../../../api/accounts/getUserAccount/useGetUserAccount";

export const AccountSettings = () => {
  const { data: account, isLoading: isAccountLoading } = useGetUserAccount();

  const formSchema = z.object({
    userId: z.string().uuid(),
    email: z.string().email({
      message: "Email must be valid.",
    }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: useMemo(() => {
        return account?.userId ?? "";
      }, [account]),
      email: useMemo(() => {
        return account?.email ?? "";
      }, [account]),
    },
  });
  useEffect(() => {
    form.reset({ email: account?.email ?? "", userId: account?.userId ?? "" });
  }, [form, account]);

  const passwordFormSchema = z.object({
    password: z.string().min(8, {
      message: "Password must be at least 8 characters long.",
    }),
    confirmPassword: z.string().min(8, {
      message: "Password must be at least 8 characters long.",
    }),
  });
  const passwordForm = useForm<z.infer<typeof passwordFormSchema>>({
    resolver: zodResolver(passwordFormSchema),
  });

  if (isAccountLoading || !account) {
    return <Skeleton className="w-[100px] h-[20px] rounded-full" />;
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Title */}
      <div className="flex flex-col gap-0.5">
        <h2 className="text-xl font-semibold">Account</h2>
        <p className="text-muted-foreground text-sm">
          Settings regarding your account
        </p>
      </div>
      <Separator />
      <div className="flex flex-col gap-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((hej) => console.log(hej))}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="userId"
              disabled
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User Id</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormDescription>
                    Your personal user id. Useful if support needs to help you.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormDescription>
                    The email used to login and to contact you through.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-fit" type="submit">
              Change Email
            </Button>
          </form>
        </Form>
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold">Change Password</h2>
          <Separator />
          <Form {...passwordForm}>
            <form
              onSubmit={passwordForm.handleSubmit((hej) => console.log(hej))}
              className="flex flex-col gap-4"
            >
              <FormField
                control={passwordForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" autoComplete="off" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={passwordForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" autoComplete="off" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-fit" type="submit">
                Change Password
              </Button>
            </form>
          </Form>
        </div>
        <div className="flex flex-row gap-4 w-full">
          <div className="flex flex-col gap-2 w-full">
            <div className="flex flex-col items-start gap-1">
              <h2 className="text-lg font-semibold">Session Logout</h2>
              <p className="text-muted-foreground text-sm">
                Unsure how many devices you're logged into? Logout of all of
                them.
              </p>
            </div>
            <Separator />
            <Button className="w-fit" variant="secondary">
              Logout
            </Button>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <div className="flex flex-col items-start gap-1">
              <div className="flex flex-row gap-2 items-center">
                <TriangleAlert />
                <h2 className="text-lg font-semibold">Delete Account</h2>
              </div>
              <p className="text-muted-foreground text-sm">
                Don't want your account to exists anymore? Delete your account
                here.
              </p>
            </div>
            <Separator />
            <Button className="w-fit" variant="destructive">
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
