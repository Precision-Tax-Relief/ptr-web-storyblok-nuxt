// useBusinessHours.test.ts
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { isBusinessOpenAt } from "~/composables/useBusinessHours"

describe("Business Hours", () => {
  // Test for normal business hours on a weekday
  it("should return true during business hours on a weekday", () => {
    // Wednesday, March 10, 2021, 10:30 AM
    const testDate = new Date(2021, 2, 10, 10, 30)
    expect(isBusinessOpenAt(testDate)).toBe(true)
  })

  // Test for business hours edge cases
  it("should return true exactly at opening time", () => {
    // Wednesday, March 10, 2021, 7:00 AM
    const testDate = new Date(2021, 2, 10, 7, 0)
    expect(isBusinessOpenAt(testDate)).toBe(true)
  })

  it("should return false exactly at closing time", () => {
    // Wednesday, March 10, 2021, 6:00 PM
    const testDate = new Date(2021, 2, 10, 18, 0)
    expect(isBusinessOpenAt(testDate)).toBe(false)
  })

  // Test for outside business hours (too early)
  it("should return false before business hours on a weekday", () => {
    // Wednesday, March 10, 2021, 6:30 AM
    const testDate = new Date(2021, 2, 10, 6, 30)
    expect(isBusinessOpenAt(testDate)).toBe(false)
  })

  // Test for outside business hours (too late)
  it("should return false after business hours on a weekday", () => {
    // Wednesday, March 10, 2021, 6:30 PM
    const testDate = new Date(2021, 2, 10, 18, 30)
    expect(isBusinessOpenAt(testDate)).toBe(false)
  })

  // Test for weekend (Saturday)
  it("should return false on Saturday even during business hours", () => {
    // Saturday, March 13, 2021, 10:30 AM
    const testDate = new Date(2021, 2, 13, 10, 30)
    expect(isBusinessOpenAt(testDate)).toBe(false)
  })

  // Test for weekend (Sunday)
  it("should return false on Sunday even during business hours", () => {
    // Sunday, March 14, 2021, 10:30 AM
    const testDate = new Date(2021, 2, 14, 10, 30)
    expect(isBusinessOpenAt(testDate)).toBe(false)
  })

  // Test for New Year's Day
  it("should return false on New Year's Day", () => {
    // Friday, January 1, 2021, 10:30 AM
    const testDate = new Date(2021, 0, 1, 10, 30)
    expect(isBusinessOpenAt(testDate)).toBe(false)
  })

  // Test for observed New Year's Day (when Jan 1 falls on Sunday)
  it("should return false on observed New Year's Day (Monday after)", () => {
    // Monday, January 2, 2023, 10:30 AM
    // (January 1, 2023 is a Sunday, so it's observed on Monday)
    const testDate = new Date(2023, 0, 2, 10, 30)
    expect(isBusinessOpenAt(testDate)).toBe(false)
  })

  // Test for regular Monday after New Year's (not observed)
  it("should return true on a Monday after New Year's when not observed", () => {
    // Monday, January 2, 2024, 10:30 AM
    // (January 1, 2024 is not a Sunday, so business should be open)
    const testDate = new Date(2024, 0, 2, 10, 30)
    expect(isBusinessOpenAt(testDate)).toBe(true)
  })

  // Test for Memorial Day (last Monday in May)
  it("should return false on Memorial Day", () => {
    // Monday, May 31, 2021, 10:30 AM
    const testDate = new Date(2021, 4, 31, 10, 30)
    expect(isBusinessOpenAt(testDate)).toBe(false)
  })

  // Test for Independence Day
  it("should return false on Independence Day", () => {
    // Sunday, July 4, 2021, 10:30 AM
    const testDate = new Date(2021, 6, 4, 10, 30)
    expect(isBusinessOpenAt(testDate)).toBe(false)
  })

  // Test for observed Independence Day (when July 4 falls on Sunday)
  it("should return false on observed Independence Day (Monday after)", () => {
    // Monday, July 5, 2021, 10:30 AM
    const testDate = new Date(2021, 6, 5, 10, 30)
    expect(isBusinessOpenAt(testDate)).toBe(false)
  })

  // Test for regular Monday after Independence Day (not observed)
  it("should return true on a Monday after Independence Day when not observed", () => {
    // Monday, July 5, 2022, 10:30 AM (July 4, 2022 is a Monday, not a Sunday)
    const testDate = new Date(2022, 6, 5, 10, 30)
    expect(isBusinessOpenAt(testDate)).toBe(true)
  })

  // Test for Labor Day (first Monday in September)
  it("should return false on Labor Day", () => {
    // Monday, September 6, 2021, 10:30 AM
    const testDate = new Date(2021, 8, 6, 10, 30)
    expect(isBusinessOpenAt(testDate)).toBe(false)
  })

  // Test for Thanksgiving Day (fourth Thursday in November)
  it("should return false on Thanksgiving Day", () => {
    // Thursday, November 25, 2021, 10:30 AM
    const testDate = new Date(2021, 10, 25, 10, 30)
    expect(isBusinessOpenAt(testDate)).toBe(false)
  })

  // Test for Day after Thanksgiving
  it("should return false on the day after Thanksgiving", () => {
    // Friday, November 26, 2021, 10:30 AM
    const testDate = new Date(2021, 10, 26, 10, 30)
    expect(isBusinessOpenAt(testDate)).toBe(false)
  })

  // Test for Christmas
  it("should return false on Christmas Day", () => {
    // Saturday, December 25, 2021, 10:30 AM
    const testDate = new Date(2021, 11, 25, 10, 30)
    expect(isBusinessOpenAt(testDate)).toBe(false)
  })

  // Test for observed Christmas (when Dec 25 falls on Sunday)
  it("should return false on observed Christmas Day (Monday after)", () => {
    // Monday, December 26, 2022, 10:30 AM
    // (December 25, 2022 is a Sunday, so it's observed on Monday)
    const testDate = new Date(2022, 11, 26, 10, 30)
    expect(isBusinessOpenAt(testDate)).toBe(false)
  })

  // Test for regular day after Christmas (not observed)
  it("should return true on the day after Christmas when not observed", () => {
    // Tuesday, December 26, 2023, 10:30 AM
    // (December 25, 2023 is a Monday, so the 26th is not observed)
    const testDate = new Date(2023, 11, 26, 10, 30)
    expect(isBusinessOpenAt(testDate)).toBe(true)
  })

  // Test a regular day that's not a holiday or weekend
  it("should return true on a regular business day that is not a holiday", () => {
    // Tuesday, March 16, 2021, 10:30 AM
    const testDate = new Date(2021, 2, 16, 10, 30)
    expect(isBusinessOpenAt(testDate)).toBe(true)
  })
})
