import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HiHi from './HiHi.vue'

describe('HelloWorld', () => {
  it('renders', () => {
    const msg = 'Hi'
    const wrapper = mount(HiHi)
    expect(wrapper.text()).toContain(msg)
  })
})
