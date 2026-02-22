/**
 * TVMaze API Type Definitions
 * Based on: https://www.tvmaze.com/api
 */

export interface Country {
  name: string
  code: string
  timezone: string
}

export interface Network {
  id: number
  name: string
  country: Country
  officialSite: string | null
}

export interface WebChannel {
  id: number
  name: string
  country: Country | null
  officialSite: string | null
}

export interface Image {
  medium: string
  original: string
}

export interface Rating {
  average: number | null
}

export interface Schedule {
  time: string
  days: string[]
}

export interface Externals {
  tvrage: number | null
  thetvdb: number | null
  imdb: string | null
}

export interface Show {
  id: number
  url: string
  name: string
  type: string
  language: string | null
  genres: string[]
  status: string
  runtime: number | null
  averageRuntime: number | null
  premiered: string | null
  ended: string | null
  officialSite: string | null
  schedule: Schedule
  rating: Rating
  weight: number
  network: Network | null
  webChannel: WebChannel | null
  dvdCountry: string | null
  externals: Externals
  image: Image | null
  summary: string | null
  updated: number
  _links: {
    self: { href: string }
    previousepisode?: { href: string; name: string }
    nextepisode?: { href: string; name: string }
  }
  _embedded?: {
    cast?: Cast[]
    episodes?: Episode[]
  }
}

export interface SearchResult {
  score: number
  show: Show
}

export interface Person {
  id: number
  url: string
  name: string
  country: Country | null
  birthday: string | null
  deathday: string | null
  gender: string | null
  image: Image | null
  updated: number
  _links: {
    self: { href: string }
  }
}

export interface Character {
  id: number
  url: string
  name: string
  image: Image | null
  _links: {
    self: { href: string }
  }
}

export interface Cast {
  person: Person
  character: Character
  self: boolean
  voice: boolean
}

export interface Episode {
  id: number
  url: string
  name: string
  season: number
  number: number
  type: string
  airdate: string | null
  airtime: string | null
  airstamp: string | null
  runtime: number | null
  rating: Rating
  image: Image | null
  summary: string | null
  _links: {
    self: { href: string }
    show: { href: string }
  }
}
