import { shallowMount, mount } from '@vue/test-utils'
import AdminMenu from '../admin-menu'
import { generateId } from './../../../utils/nanoid'

describe('AdminMenuItem', () => {
  test('is vue component', () => {
    const wrapper = shallowMount(AdminMenu, { propsData: { items: [] } })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('check for props exists', () => {
    const wrapper = shallowMount(AdminMenu, { propsData: { items: [] } })
    expect(wrapper.vm.items).toBeInstanceOf(Array)
  })

  test('create test menu', () => {
    const items = [
      {
        id: generateId(),
        title: 'Post List',
        subTitle: 'Post list Subtitle',
        type: 'item',
        component: 'components/posts-list',
      },
      {
        id: generateId(),
        title: 'Categories',
        type: 'item',
        component: 'components/categories',
      },
    ]
    const wrapper = mount(AdminMenu, { propsData: { items }, attachToDocument: true })
    expect(wrapper.contains('.q-list')).toBe(true)
    expect(wrapper.findAll('.q-item').length).toBe(2)
  })
})
