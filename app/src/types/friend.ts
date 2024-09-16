import { z } from "zod";
import { UserSchema } from "./user";

export const FriendSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime().nullable(),
  deletedAt: z.string().datetime().nullable(),
  friend: UserSchema.omit({ password: true }),
});
export type Friend = z.infer<typeof FriendSchema>;

const FriendRequestStatusSchema = z.enum(["PENDING", "ACCEPTED", "DECLINED"]);

export const FriendRequestSchema = z.object({
  id: z.string().uuid(),
  receiverId: z.string().uuid(),
  senderId: z.string().uuid(),
  status: FriendRequestStatusSchema,
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime().nullable(),
  deletedAt: z.string().datetime().nullable(),
});
export type FriendRequest = z.infer<typeof FriendRequestSchema>;

export const ReceivedFriendRequestWithUserSchema = FriendRequestSchema.omit({
  senderId: true,
}).extend({
  sender: UserSchema.omit({ password: true }),
});
export type ReceivedFriendRequestWithUser = z.infer<
  typeof ReceivedFriendRequestWithUserSchema
>;

export const SentFriendRequestWithUserSchema = FriendRequestSchema.omit({
  receiverId: true,
}).extend({
  receiver: UserSchema.omit({ password: true }),
});
export type SentFriendRequestWithUser = z.infer<
  typeof SentFriendRequestWithUserSchema
>;
