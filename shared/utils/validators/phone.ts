import { z } from "zod"
import { parsePhoneNumberFromString } from "libphonenumber-js"

// Define the schema
export const phoneValidator = z
  .string()
  .trim()
  .min(1, "Required")
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
      message: "Invalid phone number"
    }
  )
