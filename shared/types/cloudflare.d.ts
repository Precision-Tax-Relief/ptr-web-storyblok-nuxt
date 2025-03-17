// Define the Cloudflare environment interface
interface Env {
  ANALYTICS_KEY: string
}

// Define the Cloudflare context interface
export interface CloudflareContext {
  env: Env
  request: Request
  waitUntil: (promise: Promise<any>) => void
}
