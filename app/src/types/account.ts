import { z } from "zod";

export const AccountSchema = z.object({
  userId: z.string().uuid(),
  email: z.string().email(),
  password: z.string(),
});
export type Account = z.infer<typeof AccountSchema>;
