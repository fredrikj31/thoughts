import { z } from "zod";

export const ProfileSchema = z.object({
  userId: z.string().uuid(),
  username: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  birthDate: z.string(),
  gender: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime().nullable(),
  deletedAt: z.string().datetime().nullable(),
});
export type Profile = z.infer<typeof ProfileSchema>;
