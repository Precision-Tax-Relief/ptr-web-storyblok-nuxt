type oneToNine = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
type zeroToNine = 0 | oneToNine

/**
 * Years
 */
type YYYY = `20${zeroToNine}${zeroToNine}`
/**
 * Months
 */
type MM = `0${oneToNine}` | `1${0 | 1 | 2}`
/**
 * Days
 */
type DD = `${0}${oneToNine}` | `${1 | 2}${zeroToNine}` | `3${0 | 1}`

/**
 * Hours
 */
type hh = `${0 | 1}${zeroToNine}` | `2${0 | 1 | 2 | 3 | 4}`

/**
 * Minutes
 */
type mm = `${0 | 1 | 2 | 3 | 4 | 5}${zeroToNine}`

/**
 * Seconds
 */
type ss = mm

/**
 * YYYY-MM-DDThh:mm:ss
 */
type RawDateString = `${YYYY}-${MM}-${DD}T${hh}:${mm}:${ss}`

/**
 * Wordpress API
 */

type LinkObj = {
  href: string
  embeddable?: boolean
  taxonomy?: string
}

interface BaseWpAPI {
  id: number
  date: string
  date_gmt: string
  modified: string
  modified_gmt: string
  slug: string
  status: string
  type: string
  title: { rendered: string }
  author: number
  template: string
}

interface WpPost extends BaseWpAPI {
  featured_media: number
  categories: number[]
  tags: number[]
  _links: {
    self: LinkObj[]
    collection: LinkObj[]
    about: LinkObj[]
    author: LinkObj[]
    replies: LinkObj[]
    "version-history": LinkObj[]
    "wp:featuredmedia": LinkObj[]
    "wp:attachment": LinkObj[]
    "wp:term": LinkObj[]
  }
}

interface WpMedia extends BaseWpAPI {
  alt_text: string
  source_url: string
}
