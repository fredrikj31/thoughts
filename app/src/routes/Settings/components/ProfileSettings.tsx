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
import { Textarea } from "@shadcn-ui/components/ui/textarea";
import { useGetUserProfile } from "../../../api/profiles/getUserProfile/useGetUserProfile";
import { Skeleton } from "@shadcn-ui/components/ui/skeleton";
import { useEffect, useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shadcn-ui/components/ui/select";
import { config } from "../../../config";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@shadcn-ui/components/ui/avatar";
import { useUploadProfilePicture } from "../../../api/uploads/uploadProfilePicture/useUploadProfilePicture";
import { useToast } from "@shadcn-ui/components/ui/use-toast";

export const ProfileSettings = () => {
  const { toast } = useToast();

  const { data: profile, isLoading: isProfileLoading } = useGetUserProfile();
  const {
    mutate: uploadProfilePicture,
    isPending: isUploadingProfilePicturePending,
  } = useUploadProfilePicture();

  const formSchema = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    firstName: z.string().min(1, {
      message: "First name must be at least 1 character.",
    }),
    lastName: z.string().min(1, {
      message: "Last name must be at least 1 character.",
    }),
    birthDate: z.string().date("Birth date must be a date."),
    gender: z.string(),
    bio: z.string().optional(),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: useMemo(() => {
        return profile?.username ?? "";
      }, [profile]),
      firstName: useMemo(() => {
        return profile?.firstName ?? "";
      }, [profile]),
      lastName: useMemo(() => {
        return profile?.lastName ?? "";
      }, [profile]),
      birthDate: useMemo(() => {
        return profile?.birthDate ?? "";
      }, [profile]),
      gender: useMemo(() => {
        return profile?.gender ?? "";
      }, [profile]),
    },
  });

  const [selectedProfilePicture, setSelectedProfilePicture] = useState<
    File | undefined
  >(undefined);
  const [previewProfilePicture, setPreviewProfilePicture] = useState<
    string | undefined
  >(undefined);

  useEffect(() => {
    if (!selectedProfilePicture) {
      setPreviewProfilePicture(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedProfilePicture);
    setPreviewProfilePicture(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedProfilePicture]);

  useEffect(() => {
    form.reset({
      username: profile?.username ?? "",
      firstName: profile?.firstName ?? "",
      lastName: profile?.lastName ?? "",
      birthDate: profile?.birthDate ?? "",
      gender: profile?.gender ?? "",
    });
  }, [form, profile]);

  const submitUploadProfilePicture = () => {
    if (!selectedProfilePicture) {
      toast({
        title: "No Picture Selected!",
        description: "Please select a profile picture",
      });
      return;
    }

    uploadProfilePicture(
      { profilePicture: selectedProfilePicture },
      {
        onSuccess() {
          toast({
            title: "Picture Updated!",
            description: "Successfully updated profile picture",
          });
        },
        onError() {
          toast({
            variant: "destructive",
            title: "Error!",
            description: "Error while trying to update profile picture",
          });
        },
      },
    );
  };

  if (isProfileLoading || !profile) {
    return <Skeleton className="w-[100px] h-[20px] rounded-full" />;
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Title */}
      <div className="flex flex-col gap-0.5">
        <h2 className="text-xl font-semibold">Profile</h2>
        <p className="text-muted-foreground text-sm">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((hej) => console.log(hej))}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  This is your public username on the platform.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-row gap-4 w-full">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-row gap-4 w-full">
            <FormField
              control={form.control}
              name="birthDate"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Birth Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <Select {...field}>
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
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Biography</FormLabel>
                <FormControl>
                  <Textarea placeholder="Lorem Ipsum..." {...field} />
                </FormControl>
                <FormDescription>
                  This is your biography, tell us something about you.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-fit" type="submit">
            Update Settings
          </Button>
        </form>
      </Form>
      {/* Profile Picture */}
      <div className="flex flex-col gap-0.5">
        <h2 className="text-xl font-semibold">Profile Picture</h2>
        <p className="text-muted-foreground text-sm">
          Smile to the world, and the world smiles back at you.
        </p>
      </div>
      <Separator />
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          {selectedProfilePicture ? (
            <img
              className="size-52 object-cover rounded-full"
              height={208}
              width={208}
              src={previewProfilePicture}
            />
          ) : (
            <Avatar className="size-52">
              <AvatarImage
                className="object-cover"
                src={`${config.assets.baseUrl}/profiles/${profile.userId}`}
              />
              <AvatarFallback className="text-5xl">
                {`${profile.firstName[0]}${profile.lastName[0]}`.toUpperCase()}
              </AvatarFallback>
            </Avatar>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <Input
            className="w-fit"
            type="file"
            onChange={(e) => {
              if (!e.target.files || e.target.files.length === 0) {
                setSelectedProfilePicture(undefined);
                return;
              }

              // I've kept this example simple by using the first image instead of multiple
              setSelectedProfilePicture(e.target.files[0]);
            }}
          />
          <Button
            className="w-fit"
            disabled={isUploadingProfilePicturePending}
            onClick={() => submitUploadProfilePicture()}
          >
            Update Profile Picture
          </Button>
        </div>
      </div>
    </div>
  );
};
