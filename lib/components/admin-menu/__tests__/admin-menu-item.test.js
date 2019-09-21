import Vuex from 'vuex'
import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import AdminMenuItem from '../admin-menu-item'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('AdminMenuItem', () => {
  test('is vue component', () => {
    const wrapper = shallowMount(AdminMenuItem, { localVue, props: { id: 'home', type: 'item' } })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('check for props exists', () => {
    const wrapper = mount(AdminMenuItem, { localVue, propsData: { id: 'home', type: 'item' } })
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
