import { z } from "zod"
import { parsePhoneNumberFromString } from "libphonenumber-js"

// Define the schema
const phoneValidator = z
  .string()
  .trim()
  .min(1, "Phone Number is required")
  .refine(
    (value) => {
      try {
        const phoneNumber = parsePhoneNumberFromString(value)
        return phoneNumber && phoneNumber.isValid()
      } catch (error) {
        return false
      }
    },
    {
      message: "Please provide a valid phone number"
    }
  )

const ContactFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().email("Please provide a valid email address"),
  phone: phoneValidator
})

// Input type (before transformation)
export type ContactAnswerInput = z.input<typeof ContactFormSchema>

// Output type (after transformation)
export type ContactAnswerOutput = z.output<typeof ContactFormSchema>
