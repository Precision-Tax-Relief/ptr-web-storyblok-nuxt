// schemas.ts
import { z } from "zod"

export const ServerErrorResponseSchema = z.object({
  success: z.literal(false),
  message: z.string(),
  errors: z.record(z.union([z.string(), z.record(z.string())])).optional()
})
