import { z } from "zod"

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
