// fetchRoutes.ts
import fetch from "node-fetch"
const toIgnore = ["home", "layouts/default"]

export async function fetchStories(cacheVersion: number, page = 1): Promise<string[]> {
  const token = process.env.STORYBLOCK_TOKEN
  const version = "published"
  const perPage = 100
  let routes: string[] = []

  try {
    const response = await fetch(
      `https://api-us.storyblok.com/v2/cdn/links?token=${token}&version=${version}&per_page=${perPage}&page=${page}&cv=${cacheVersion}`
    )
    const data = await response.json()

    // Add routes to the array
    Object.values(data.links).forEach((link) => {
      if (!toIgnore.includes(link.slug)) {
        routes.push("/" + link.slug)
      }
    })

    // Check if there are more pages with links
    const total = response.headers.get("total")
    const maxPage = Math.ceil(total / perPage)

    if (maxPage > page) {
      const nextRoutes = await fetchStories(cacheVersion, ++page)
      routes = routes.concat(nextRoutes)
    }
  } catch (error) {
    console.error(error)
  }

  // return the routes
  return routes
}
