import { z } from "zod"

// Define the schema
export const ContextSchema = z.object({
  ga_client_id: z.string().optional(),
  page_url: z.string().optional(),
  referrer: z.string().optional(),
  path: z.string().optional(),
  tax_amount_id: z.string().optional(),
  gclid: z.string().optional(),
  msclkid: z.string().optional(),
  gbraid: z.string().optional(),
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
  utm_content: z.string().optional()
})

// Input type (before transformation)
export type ContextInput = z.input<typeof ContextSchema>

// Output type (after transformation)
export type ContextOutput = z.output<typeof ContextSchema>
