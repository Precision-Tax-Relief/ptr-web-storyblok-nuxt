import { z } from "zod"

/**
 * Formats Zod errors into a more readable structure
 */
export function formatZodErrors(error: z.ZodError) {
  return error.errors.map((err) => ({
    path: err.path.join("."),
    message: err.message
  }))
}
