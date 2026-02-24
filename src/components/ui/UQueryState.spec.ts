import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UQueryState from './UQueryState.vue'

describe('UQueryState', () => {
  it('renders loading message when isLoading is true', () => {
    const wrapper = mount(UQueryState, {
      props: {
        isLoading: true,
        isError: false,
        isEmpty: false
      }
    })

    expect(wrapper.text()).toContain('Loading...')
  })

  it('renders error message when isError is true', () => {
    const wrapper = mount(UQueryState, {
      props: {
        isLoading: false,
        isError: true,
        isEmpty: false
      }
    })

    expect(wrapper.text()).toContain('Something went wrong. Please try again.')
  })

  it('renders empty message when isEmpty is true', () => {
    const wrapper = mount(UQueryState, {
      props: {
        isLoading: false,
        isError: false,
        isEmpty: true
      }
    })

    expect(wrapper.text()).toContain('No data found.')
  })

  it('renders custom messages', () => {
    const wrapper = mount(UQueryState, {
      props: {
        isLoading: true,
        loadingMessage: 'Fetching data...',
        errorMessage: 'Oops!',
        emptyMessage: 'Nothing here'
      }
    })

    expect(wrapper.text()).toContain('Fetching data...')
  })

  it('prioritizes loading over error when both are true', () => {
    const wrapper = mount(UQueryState, {
      props: {
        isLoading: true,
        isError: true,
        isEmpty: false
      }
    })

    expect(wrapper.text()).toContain('Loading...')
    expect(wrapper.text()).not.toContain('Something went wrong')
  })

  it('prioritizes error over empty when both are true', () => {
    const wrapper = mount(UQueryState, {
      props: {
        isLoading: false,
        isError: true,
        isEmpty: true
      }
    })

    expect(wrapper.text()).toContain('Something went wrong')
    expect(wrapper.text()).not.toContain('No data found')
  })

  it('renders nothing when all states are false', () => {
    const wrapper = mount(UQueryState, {
      props: {
        isLoading: false,
        isError: false,
        isEmpty: false
      }
    })

    expect(wrapper.text()).toBe('')
  })
})
