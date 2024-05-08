import { z } from "zod";

export const UserSchema = z.object({
  email: z.string().email(),
  username: z.string(),
  password: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  birthDate: z.string(),
  gender: z.string(),
});
export type User = z.infer<typeof UserSchema>;
