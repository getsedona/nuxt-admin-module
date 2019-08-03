import { shallowMount, mount } from '@vue/test-utils'
import BlocksPaletteItem from '../blocks-palette-item'

describe('BlocksPaletteItem', () => {
  test('is vue component', () => {
    const wrapper = shallowMount(BlocksPaletteItem)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('check with correct props', () => {
    const wrapper = mount(BlocksPaletteItem, {
      propsData: { title: 'Test title', description: 'Test description', icon: 'home' },
    })
    expect(wrapper.findAll('.q-item__label').length).toBe(2)
    expect(wrapper.contains('.q-avatar')).toBe(true)
  })

  test('check without props', () => {
    const wrapper = mount(BlocksPaletteItem)
    expect(wrapper.findAll('.q-item__label').length).toBe(1) // only title, without subtitle
    expect(wrapper.contains('.q-avatar')).toBe(true)
  })
})
