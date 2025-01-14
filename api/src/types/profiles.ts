import z from "zod";
import { DateSchema, GenderSchema } from ".";

export const ProfileSchema = z.object({
  userId: z.string().uuid(),
  username: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  birthDate: DateSchema,
  gender: GenderSchema,
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime().nullable(),
  deletedAt: z.string().datetime().nullable(),
});
export type Profile = z.infer<typeof ProfileSchema>;
