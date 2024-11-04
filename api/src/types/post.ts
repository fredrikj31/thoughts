import z from "zod";
import { UserSchema } from "./user";

export const PostSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  content: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime().nullable(),
  deletedAt: z.string().datetime().nullable(),
});
export type Post = z.infer<typeof PostSchema>;

export const PostWithUserSchema = PostSchema.omit({
  userId: true,
}).extend({
  user: UserSchema.omit({
    password: true,
    passwordSalt: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
  }),
});
export type PostWithUser = z.infer<typeof PostWithUserSchema>;
