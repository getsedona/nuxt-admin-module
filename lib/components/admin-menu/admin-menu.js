import Vue from 'vue'
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
     * @param {object} item
     * @returns {import('vue').VNode}
     */
    function createMenuItem(item) {
      return h('admin-menu-item', { props: { ...item } })
    }

    /**
     * Create section with menu items
     *
     * @param {Object} item
     * @returns {Array<import('vue').VNode>}
     */
    function createMenuSection(item) {
      const result = [h('q-item-label', { props: { header: true } }, upperFirst(item.title))]
      item.items.forEach((menuItem) => {
        result.push(createMenuItem.call(this, menuItem))
      })
      return result
    }

    this.items.forEach((item) => {
      switch (item.type) {
        case 'item':
          childComponents.push(createMenuItem.call(this, item))
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
