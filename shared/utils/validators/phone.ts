import { z } from "zod"
import { parsePhoneNumberFromString } from "libphonenumber-js"

// Define the schema
export const phoneValidator = z
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
