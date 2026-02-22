import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SearchShows from './SearchShows.vue'

describe('SearchShows', () => {
  it('renders search input', () => {
    const wrapper = mount(SearchShows)

    const input = wrapper.find('input[type="search"]')

    expect(input.exists()).toBe(true)
  })
})
