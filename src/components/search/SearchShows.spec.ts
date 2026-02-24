import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import SearchShows from './SearchShows.vue'

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', name: 'Dashboard', component: { template: '<div>Dashboard</div>' } },
    { path: '/show/:id', name: 'ShowDetail', component: { template: '<div>Show Detail</div>' } }
  ]
})

describe('SearchShows', () => {
  it('renders search input with correct placeholder', () => {
    const wrapper = mount(SearchShows, {
      global: {
        plugins: [router],
        stubs: {
          SearchShowsResultCard: true
        }
      }
    })

    const input = wrapper.find('[data-testid="search-input"]')
    expect(input.exists()).toBe(true)
    expect(input.attributes('placeholder')).toBe('Search shows...')
  })

  it('initializes with empty search term', () => {
    const wrapper = mount(SearchShows, {
      global: {
        plugins: [router],
        stubs: {
          SearchShowsResultCard: true
        }
      }
    })

    const input = wrapper.find('[data-testid="search-input"]')
    expect((input.element as HTMLInputElement).value).toBe('')
  })
})
