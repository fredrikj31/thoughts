import z from "zod";

export const RefreshTokenSchema = z.object({
  id: z.string(),
  userId: z.string(),
  expiresAt: z.string().datetime(),
});
export type RefreshToken = z.infer<typeof RefreshTokenSchema>;
