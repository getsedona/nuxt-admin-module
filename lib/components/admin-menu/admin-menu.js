import Vue, { VNode } from 'vue'
import upperFirst from 'lodash/upperFirst'
import AdminMenuItem from './admin-menu-item'

export default Vue.extend({
  name: 'AdminMenu',
  components: {
    AdminMenuItem,
  },
  props: {
    items: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  render(h) {
    const childComponents = []

    /**
     * Create menu item
     *
     * @param {import('../../../types').MenuItem} item Menu item
     * @returns {VNode} VNode object
     */
    function createMenuItem(item) {
      return h('admin-menu-item', { props: { ...item } })
    }

    /**
     * Create section with menu items
     *
     * @param {import('../../../types').MenuItem} item Menu item
     * @returns {Set<VNode[]>} VNode object
     */
    function createMenuSection(item) {
      const result = new Set([h('q-item-label', { props: { header: true } }, upperFirst(item.title))])
      item.items.forEach((menuItem) => {
        result.add(createMenuItem(menuItem))
      })
      return result
    }

    this.items.forEach((item) => {
      switch (item.type) {
        case 'item':
          childComponents.push(createMenuItem(item))
          break
        case 'section':
          childComponents.push(...createMenuSection.call(this, item))
          break
      }
    })

    return h(
      'q-list',
      {
        props: { padding: true, dark: true },
        class: 'full-width',
        // style: { padding: 0 },
      },
      childComponents
    )
  },
})
