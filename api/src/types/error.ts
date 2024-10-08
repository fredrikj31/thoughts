import z from "zod";

export const ApiErrorSchema = z.object({
  code: z.string(),
  message: z.string(),
});
