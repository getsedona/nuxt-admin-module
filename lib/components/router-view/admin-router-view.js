import Vue from 'vue'
import { mapState } from 'vuex'
import { AdminMenu } from '../admin-menu'
import { ItemTabContainer } from './../item-tab-container'

/**
 * Create tab panel from menu item
 *
 * @param {object} menuItem menu item
 * @param {Function} h create element function
 * @returns {import('vue').VNode} VNode object
 */
function createMenuItemTab(menuItem, h) {
  const itemTabContainer = h('item-tab-container', { props: menuItem })
  const menuItemPanel = h(
    'q-tab-panel',
    {
      props: { name: `tab-${menuItem.id}` },
      style: { padding: 0 },
    },
    [itemTabContainer]
  )
  return menuItemPanel
}

export default Vue.extend({
  name: 'AdminRouterView',
  components: {
    AdminMenu,
    ItemTabContainer,
  },
  data() {
    return {
      activeTab: 'tab-home',
      activeTabItem: null,
      items: null,
    }
  },
  computed: {
    ...mapState({
      menuItems: (state) => state.admin.config.items,
      breadcrumbs: (state) => state.admin.breadcrumbs,
    }),
  },
  mounted() {
    this.$root.$on('admin:menu-item-change', ({ tab, ...params }) => {
      this.activeTab = tab
    })
    this.$root.$on('admin:menu-item-click', this.onMenuItemClick)
  },
  methods: {
    async onMenuItemClick(item) {
      if (item.type === 'section') {
        item.component = AdminMenu
      }
      this.activeTabItem = Vue.set(this.items, item.id, item)
      await this.$nextTick()
      this.activeTab = `tab-${item.id}`
    },
  },
  render(h) {
    if (this.activeTabItem === null && this.items === null) {
      const adminMenu = h('admin-menu', { props: { items: this.menuItems }, on: { click: this.onMenuItemClick } })
      this.items = { home: { id: 'home', component: adminMenu } }
      this.activeTabItem = {
        component: adminMenu,
      }
    }

    const views = []
    Object.keys(this.items).forEach((menuId) => {
      views.push(createMenuItemTab.call(this, this.items[menuId], h))
    })

    return h(
      'q-tab-panels',
      {
        class: ['fit'],
        style: {
          color: 'inherit',
          background: 'inherit',
        },
        ref: 'tabPanels',
        props: { animated: true, 'keep-alive': false, infinite: true, value: this.activeTab },
      },
      views
    )
  },
})
