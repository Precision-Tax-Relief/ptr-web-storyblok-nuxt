// schemas.ts
import { z } from "zod"

export const ServerErrorResponseSchema = z.object({
  success: z.literal(false),
  message: z.string(),
  errors: z.record(z.string()).optional()
})
