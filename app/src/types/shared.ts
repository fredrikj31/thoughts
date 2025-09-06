import { z } from "zod";

export const DateSchema = z
  .string()
  .regex(
    /^(?:19[0-9]{2}|2[0-1][0-9]{2})-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2][0-9]|3[0-1])$/,
  );

export const GenderSchema = z.enum(["MALE", "FEMALE", "PREFER_NOT_TO_SAY"]);
