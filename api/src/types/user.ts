import z from "zod";
import { DateSchema, GenderSchema } from ".";

export const UserSchema = z.object({
  id: z.string().uuid(),
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
  passwordSalt: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  birthDate: DateSchema,
  gender: GenderSchema,
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime().nullable(),
  deletedAt: z.string().datetime().nullable(),
});
export type User = z.infer<typeof UserSchema>;
