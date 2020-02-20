import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import AdminMenuItem from './admin-menu-item'

export default Vue.extend({
  name: 'AdminMenu',
  functional: true,
  inject: {
    components: {
      default: {
        AdminMenuItem,
      },
    },
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  render(h, { props: { items }, injections: { components } }) {
    const childComponents = new Set()

    /**
     * Create menu item
     *
     * @param {import('../../../types').MenuItem} item Menu item
     * @returns {import('vue').VNode} VNode object
     */
    function createMenuItem(item) {
      return h(components.AdminMenuItem, { props: { ...item } })
    }

    /**
     * Create section with menu items
     *
     * @param {import('../../../types').MenuItem} item Menu item
     * @returns {Set<import('vue').VNode[]>} VNode object
     */
    function createMenuSection(item) {
      const result = new Set([h('q-item-label', { props: { header: true } }, upperFirst(item.title))])
      item.items.forEach((menuItem) => {
        result.add(createMenuItem(menuItem))
      })
      return [...result]
    }

    items.forEach((item) => {
      switch (item.type) {
        case 'item':
          childComponents.add(createMenuItem(item))
          break
        case 'section':
          createMenuSection.call(this, item).map((item) => childComponents.add(item))
          break
      }
    })

    return (
      <q-list padding={true} dark={true} class="full-width">
        {...childComponents}
      </q-list>
    )
  },
})
