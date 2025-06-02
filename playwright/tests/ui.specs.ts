import { test, expect } from "@playwright/test"

// Viewports to test responsiveness
const viewports = [
  { name: "desktop", width: 1280, height: 800 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 375, height: 667 }
]

viewports.forEach(({ name, width, height }) => {
  test.describe(`${name} viewport`, () => {
    test(`should render correctly and function during business hours`, async ({ page }) => {
      await page.setViewportSize({ width, height })

      // Load your local page or hosted site with ?onhours=true
      await page.goto("http://localhost:3000/?onhours=true")

      // 🔍 Replace selectors with real ones from your HTML
      const form = page.locator("form")
      await expect(form).toBeVisible()

      // Check for input fields
      const nameInput = page.locator('input[name="name"]')
      const emailInput = page.locator('input[name="email"]')
      await expect(nameInput).toBeVisible()
      await expect(emailInput).toBeVisible()

      // Fill out and submit the form
      await nameInput.fill("Test User")
      await emailInput.fill("test@example.com")
      await form.locator('button[type="submit"]').click()

      // Check for success state / confirmation
      await expect(page.locator('[data-testid="form-success"]')).toBeVisible()

      // Optional: Take screenshot for visual diffing
      await expect(page).toHaveScreenshot(`${name}-submitted.png`)
    })
  })
})
