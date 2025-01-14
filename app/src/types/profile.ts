import { z } from "zod";

export const ProfileSchema = z.object({
  userId: z.string().uuid(),
  username: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  birthDate: z.string(),
  gender: z.string(),
});
export type Profile = z.infer<typeof ProfileSchema>;
