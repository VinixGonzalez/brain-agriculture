import { z } from "zod";

export const cropsSchema = z.object({
  label: z.string(),
  value: z.string(),
});

export type CropsSchemaType = z.infer<typeof cropsSchema>;
