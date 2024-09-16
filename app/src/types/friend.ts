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
