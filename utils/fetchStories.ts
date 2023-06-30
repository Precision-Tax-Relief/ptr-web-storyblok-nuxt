import fetch from "node-fetch"
const toIgnore = ["index", "layouts/default"]

export default async function fetchStories(routes: string[], cacheVersion: number, page: number = 1) {
  const token = process.env.STORYBLOK_TOKEN
  const version = "published"
  const perPage = 100

  try {
    const response = await fetch(
      `https://api-us.storyblok.com/v2/cdn/links?token=${token}&version=${version}&per_page=${perPage}&page=${page}&cv=${cacheVersion}`
    )
    const data = (await response.json()) as any

    // Add routes to the array
    Object.values(data.links).forEach((link: any) => {
      if (link.slug === "home") {
        console.log(JSON.stringify(link, null, 2))
      }
      if (!toIgnore.includes(link.slug) && !link.is_folder && !link.slug.startsWith("layouts/")) {
        routes.push(("/" + link.slug + "/").replace("//", "/"))
      }
    })

    // Check if there are more pages with links

    const total = response.headers.get("total") as any
    const maxPage = Math.ceil(total / perPage)

    if (maxPage > page) {
      await fetchStories(routes, cacheVersion, ++page)
    }
  } catch (error) {
    console.error(error)
  }
}
