import fetch from "node-fetch"
import { execSync } from "child_process"
import dotenv from "dotenv"

dotenv.config()

const spaceId = process.env.SPACE_ID

if (!spaceId) {
  console.error("Error: SPACE_ID is not set in environment variables")
  process.exit(1)
}

global.fetch = fetch

let output = execSync(`storyblok pull-components --space ${spaceId}`, { stdio: "inherit" })
output += execSync(`storyblok-generate-ts source=./components.${spaceId}.json target=./shared/types/component-types-sb`)
