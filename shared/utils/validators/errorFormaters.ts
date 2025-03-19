import { z } from "zod"
/**
 * Formats Zod errors into a nested object structure that matches the shape of the validated data
 */
export function formatZodErrors<T extends Record<string, any>>(error: z.ZodError): T {
  type ErrorResult = {
    [key: string]: ErrorResult | string
  }

  const result = {} as T

  for (const err of error.errors) {
    let current: ErrorResult = result

    // For all path segments except the last one, create nested objects
    for (let i = 0; i < err.path.length - 1; i++) {
      const segment = err.path[i]

      // Skip undefined segments
      if (segment === undefined) continue

      // Convert segment to string to handle both string and number types
      const key = String(segment)

      // Initialize the segment as an object if it doesn't exist
      if (!current[key]) {
        current[key] = {}
      }

      // Need to assert the type since TypeScript doesn't know this is an object
      current = current[key] as ErrorResult
    }

    // Set the message at the final path segment
    if (err.path.length > 0) {
      const lastSegment = err.path[err.path.length - 1]

      // Handle potential undefined lastSegment
      if (lastSegment !== undefined) {
        const key = String(lastSegment)
        current[key] = err.message
      }
    } else {
      // Handle root-level errors (empty path)
      current._errors = err.message
    }
  }

  return result
}
