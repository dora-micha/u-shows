import type { Show, SearchResult } from '../types/tvmaze'

const API_URL = 'https://api.tvmaze.com'

/**
 * Fetches a paginated list of TV shows
 * @param page - Page number (default: 1)
 * @returns Promise with array of shows
 */
export const fetchShows = async (page = 1): Promise<Show[]> => {
  const response = await fetch(`${API_URL}/shows?page=${page}`)
  if (!response.ok) {
    throw new Error(`Failed to fetch shows page ${page}: ${response.status}`)
  }
  return response.json()
}

/**
 * Fetches a single show by ID with embedded cast and episodes
 * @param id - Show ID
 * @returns Promise with show details
 */
export const fetchShow = async (id: Show['id']): Promise<Show> => {
  const response = await fetch(`${API_URL}/shows/${id}?embed[]=cast&embed[]=episodes`)
  if (!response.ok) {
    throw new Error(`Failed to fetch show ${id}: ${response.status}`)
  }
  return response.json()
}

/**
 * Searches for TV shows by query string
 * @param query - Search query
 * @returns Promise with array of search results
 */
export const searchShows = async (query: string): Promise<SearchResult[]> => {
  if (!query.trim()) {
    return []
  }
  const response = await fetch(`${API_URL}/search/shows?q=${encodeURIComponent(query)}`)
  if (!response.ok) {
    throw new Error(`Failed to search shows: ${response.status}`)
  }
  return response.json()
}
