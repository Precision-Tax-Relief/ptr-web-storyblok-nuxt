// useBusinessHours.ts
import { ref, computed, type ComputedRef, type Ref, onUnmounted } from "vue"

// Function to determine if business is open at a specific date. Used in testing
export function isBusinessOpenAt(date: Date): boolean {
  // Get the current date in Pacific Time
  const pacificDate: Date = new Date(date.toLocaleString("en-US", { timeZone: "America/Los_Angeles" }))

  // Check if it's a weekend (0 = Sunday, 6 = Saturday)
  const dayOfWeek: number = pacificDate.getDay()
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    return false // Closed on weekends
  }

  // Check business hours (7 AM to 6 PM)
  const hour: number = pacificDate.getHours()
  const minute: number = pacificDate.getMinutes()

  // Convert hours and minutes to minutes since midnight
  const currentMinutes: number = hour * 60 + minute
  const openMinutes: number = 7 * 60 + 1 // 7 AM
  const closeMinutes: number = 18 * 60 - 1 // 6 PM

  if (currentMinutes < openMinutes || currentMinutes >= closeMinutes) {
    return false // Outside business hours
  }

  // Check if it's a holiday
  if (isHoliday(pacificDate)) {
    return false // Closed on holidays
  }

  // If we've passed all checks, the business is open
  return true
}

export function useBusinessHours(): { isBusinessOpen: ComputedRef<boolean> } {
  // Create a reactive reference for the current time
  const currentTime: Ref<Date> = ref(new Date())

  // Store the timer reference
  let timer: number | null = null

  // Setup the timer only on client-side
  onMounted(() => {
    // Update the current time every minute
    timer = window.setInterval(() => {
      currentTime.value = new Date()
    }, 60000) // 60,000 milliseconds = 1 minute
  })

  // Clean up the interval when the component is unmounted
  onUnmounted(() => {
    if (timer !== null) {
      clearInterval(timer)
    }
  })

  // Compute whether the business is open based on current time
  const isBusinessOpen: ComputedRef<boolean> = computed(() => {
    return false
    return isBusinessOpenAt(currentTime.value)
  })

  return {
    isBusinessOpen
  }
}

// Helper function to check if a date is a holiday
function isHoliday(date: Date): boolean {
  const year: number = date.getFullYear()
  const month: number = date.getMonth()
  const day: number = date.getDate()

  // Create an array of holiday dates for the current year
  const holidays: Date[] = [
    getNewYearsDay(year),
    getMemorialDay(year),
    getIndependenceDay(year),
    getLaborDay(year),
    getThanksgivingDay(year),
    getDayAfterThanksgiving(year),
    getChristmasDay(year)
  ]

  // Check if today's date matches any holiday
  return holidays.some(
    (holiday) => holiday.getFullYear() === year && holiday.getMonth() === month && holiday.getDate() === day
  )
}

// Helper functions to calculate holiday dates
function getNewYearsDay(year: number): Date {
  const holiday: Date = new Date(year, 0, 1) // January 1
  // If it falls on Sunday, observe on Monday
  if (holiday.getDay() === 0) {
    return new Date(year, 0, 2) // January 2
  }
  return holiday
}

function getMemorialDay(year: number): Date {
  // Memorial Day is the last Monday in May
  let day: number = 31
  let date: Date = new Date(year, 4, day) // May (0-indexed)
  while (date.getDay() !== 1) {
    // 1 = Monday
    day--
    date = new Date(year, 4, day)
  }
  return date
}

function getIndependenceDay(year: number): Date {
  const holiday: Date = new Date(year, 6, 4) // July 4
  // If it falls on Sunday, observe on Monday
  if (holiday.getDay() === 0) {
    return new Date(year, 6, 5) // July 5
  }
  return holiday
}

function getLaborDay(year: number): Date {
  // Labor Day is the first Monday in September
  let day: number = 1
  let date: Date = new Date(year, 8, day) // September (0-indexed)
  while (date.getDay() !== 1) {
    // 1 = Monday
    day++
    date = new Date(year, 8, day)
  }
  return date
}

function getThanksgivingDay(year: number): Date {
  // Thanksgiving is the fourth Thursday in November
  let day: number = 1
  let date: Date = new Date(year, 10, day) // November (0-indexed)
  let thursdayCount: number = 0

  while (thursdayCount < 4 && day < 32) {
    if (date.getDay() === 4) {
      // 4 = Thursday
      thursdayCount++
    }
    if (thursdayCount < 4) {
      day++
      date = new Date(year, 10, day)
    }
  }

  return date
}

function getDayAfterThanksgiving(year: number): Date {
  // Day after Thanksgiving is the fourth Thursday in November + 1 day
  const thanksgiving: Date = getThanksgivingDay(year)
  return new Date(thanksgiving.getFullYear(), thanksgiving.getMonth(), thanksgiving.getDate() + 1)
}

function getChristmasDay(year: number): Date {
  const holiday: Date = new Date(year, 11, 25) // December 25
  // If it falls on Sunday, observe on Monday
  if (holiday.getDay() === 0) {
    return new Date(year, 11, 26) // December 26
  }
  return holiday
}
