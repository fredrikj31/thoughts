import z from "zod";

export const AccountSchema = z.object({
  userId: z.string().uuid(),
  email: z.string().email(),
  password: z.string(),
  passwordSalt: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime().nullable(),
  deletedAt: z.string().datetime().nullable(),
});
export type Account = z.infer<typeof AccountSchema>;
