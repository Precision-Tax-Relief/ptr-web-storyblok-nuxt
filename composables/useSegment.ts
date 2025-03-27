import { ref, onMounted } from "vue"

interface SegmentProperties {
  [key: string]: any
}

interface SegmentOptions {
  waitForLoad?: boolean
  maxWaitTime?: number
}

interface analytics {
  identify: (userId: string, traits?: any) => void
  track: (event: string, properties?: any) => void
  page: (category?: string, name?: string, properties?: any) => void
  [key: string]: any
}

export function useSegment(options: SegmentOptions = {}) {
  const isLoaded = ref(false)
  const { waitForLoad = true, maxWaitTime = 5000 } = options

  // Check if analytics is available (loaded by GTM)
  const getAnalytics = (): any => {
    if (process.server) return null
    // @ts-ignore
    return window.analytics as analytics | undefined
  }

  // Wait for analytics to be loaded by GTM
  const waitForAnalytics = async (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (getAnalytics()) {
        resolve(true)
        return
      }

      const startTime = Date.now()
      const checkInterval = setInterval(() => {
        if (getAnalytics()) {
          clearInterval(checkInterval)
          resolve(true)
          return
        }

        if (Date.now() - startTime > maxWaitTime) {
          clearInterval(checkInterval)
          console.warn("Segment analytics not loaded by GTM within timeout period")
          resolve(false)
        }
      }, 100)
    })
  }

  onMounted(async () => {
    if (waitForLoad) {
      isLoaded.value = await waitForAnalytics()
    }
  })

  // Identify a user
  const identify = async (userId: string, traits?: SegmentProperties): Promise<boolean> => {
    if (waitForLoad && !isLoaded.value) {
      isLoaded.value = await waitForAnalytics()
    }

    const analytics = getAnalytics()
    if (!analytics) return false

    analytics.identify(userId, traits)
    return true
  }

  // Track an event
  const track = async (event: string, properties?: SegmentProperties): Promise<boolean> => {
    if (waitForLoad && !isLoaded.value) {
      isLoaded.value = await waitForAnalytics()
    }

    const analytics = getAnalytics()
    if (!analytics) return false

    analytics.track(event, properties)
    return true
  }

  // Page view
  const page = async (category?: string, name?: string, properties?: SegmentProperties): Promise<boolean> => {
    if (waitForLoad && !isLoaded.value) {
      isLoaded.value = await waitForAnalytics()
    }

    const analytics = getAnalytics()
    if (!analytics) return false

    if (category && name) {
      analytics.page(category, name, properties)
    } else if (category) {
      analytics.page(category, properties)
    } else {
      analytics.page(properties)
    }
    return true
  }

  return {
    isLoaded,
    identify,
    track,
    page,
    analytics: getAnalytics
  }
}
