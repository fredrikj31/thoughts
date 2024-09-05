import z from "zod";
import { UserSchema } from "./user";

export const FriendSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  friendId: z.string().uuid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime().nullable(),
  deletedAt: z.string().datetime().nullable(),
});
export type Friend = z.infer<typeof FriendSchema>;

export const FriendWithUserSchema = FriendSchema.omit({
  friendId: true,
}).extend({
  friend: UserSchema.omit({
    password: true,
    passwordSalt: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
  }),
});
export type FriendWithUser = z.infer<typeof FriendWithUserSchema>;

export const FriendRequestStatusSchema = z.enum([
  "PENDING",
  "ACCEPTED",
  "DECLINED",
]);
export type FriendRequestStatus = z.infer<typeof FriendRequestStatusSchema>;

export const FriendRequestSchema = z.object({
  id: z.string().uuid(),
  senderId: z.string().uuid(),
  receiverId: z.string().uuid(),
  status: FriendRequestStatusSchema,
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime().nullable(),
  deletedAt: z.string().datetime().nullable(),
});
export type FriendRequest = z.infer<typeof FriendRequestSchema>;

export const FriendRequestWithUserSchema = FriendRequestSchema.omit({
  senderId: true,
}).extend({
  sender: UserSchema.omit({
    password: true,
    passwordSalt: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
  }),
});
export type FriendRequestWithUser = z.infer<typeof FriendRequestWithUserSchema>;
