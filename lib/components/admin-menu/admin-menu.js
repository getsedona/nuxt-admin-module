import Vue from 'vue'
import { mapState } from 'vuex'
import groupBy from 'lodash/groupBy'
import upperFirst from 'lodash/upperFirst'
import AdminMenuItem from './admin-menu-item'

export default Vue.extend({
  name: 'AdminMenu',
  components: {
    AdminMenuItem,
  },
  computed: {
    ...mapState({
      items: (state) => state.admin.menuItems,
    }),
  },
  render(h) {
    const childComponents = []
    const menuItems = groupBy(this.items, 'section')

    Object.keys(menuItems).forEach((sectionName) => {
      childComponents.push(h('q-item-label', { props: { header: true } }, upperFirst(sectionName)))
      menuItems[sectionName].forEach((menuItem) => {
        childComponents.push(
          h('admin-menu-item', { props: { ...menuItem }, on: { click: (item) => this.$emit('click', item) } })
        )
      })
    })

    return h(
      'q-list',
      {
        props: { padding: true, dark: true },
        class: 'full-width',
      },
      childComponents
    )
  },
})
