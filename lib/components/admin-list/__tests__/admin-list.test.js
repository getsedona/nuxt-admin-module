import { shallowMount } from '@vue/test-utils'
import AdminList from '../admin-list'

describe('AdminList', () => {
  test('is vue component', () => {
    const wrapper = shallowMount(AdminList)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('check for props exists', () => {
    const wrapper = shallowMount(AdminList)
    expect(wrapper.vm.items).toBeInstanceOf(Array)
    expect(wrapper.vm.actions).toBeInstanceOf(Array)
    expect(wrapper.vm.titleFieldName).toBe('title')
    expect(wrapper.vm.subtitleFieldName).toBe('')
    expect(wrapper.vm.hideFullScreen).toBe(false)
    expect(wrapper.vm.itemClick).toBeInstanceOf(Function)
  })
})
