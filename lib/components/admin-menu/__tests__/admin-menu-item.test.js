import { shallowMount } from '@vue/test-utils'
import AdminMenuItem from '../admin-menu-item'

describe('AdminMenuItem', () => {
  test('is vue component', () => {
    const wrapper = shallowMount(AdminMenuItem, { props: { id: 'home', type: 'item' } })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('check for props exists', () => {
    const wrapper = shallowMount(AdminMenuItem, { propsData: { id: 'home', type: 'item' } })
    const props = {
      id: 'home',
      title: '<NO TITLE>',
      subTitle: '',
      component: '',
    }
    Object.keys(props).forEach((key) => expect(wrapper.vm[key]).toBe(props[key]))
    expect(wrapper.vm.items).toBeInstanceOf(Array)
  })
})
