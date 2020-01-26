import Vue from 'vue'
import { mapState } from 'vuex'
import { AdminMenu } from '../admin-menu'
import { ItemTabContainer } from './../item-tab-container'

/**
 * Create tab panel from menu item
 *
 * @param {import('../../../types').MenuItem} menuItem Menu item
 * @param {import('vue').CreateElement} h Create element function
 * @returns {import('vue').VNode} VNode object
 */
function createMenuItemTab(menuItem, h) {
  const itemTabContainer = h('item-tab-container', { props: menuItem })
  const menuItemPanel = h(
    'q-tab-panel',
    {
      props: { name: `tab-${menuItem.id}` },
      style: { padding: '5px 0px' },
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
      activeTab: 'tab-home', // Tab ID
      items: {}, // Menu Items
    }
  },
  computed: {
    ...mapState({
      menuItems: (state) => state.admin.config.data.items,
      breadcrumbs: (state) => state.admin.breadcrumbs,
    }),
  },
  mounted() {
    this.$admin.$on('admin:view-change', (item, params) => {
      if (typeof item === 'object') {
        if (`tab-${item.id}` === this.activeTab) {
          return
        }
        this.menuItemClick(Object.assign(item, { icon: 'folder', params }))
      }
      if (typeof item === 'string') {
        if (this.activeTab === item) {
          return
        }
        this.activeTab = item
      }
    })
    this.$admin.$on('admin:view-back', () => this.goBack())
  },
  methods: {
    /**
     * Menu item click
     *
     * @param {import('../../../types').MenuItem} item Menu Item
     */
    async menuItemClick(item) {
      if (item.type === 'section') {
        item.component = AdminMenu
      }
      this.$set(this.items, item.id, item)
      await this.$nextTick()
      this.activeTab = `tab-${item.id}`
    },
    goBack() {
      const { id } = this.$store.getters['admin/prevBreadcrumbItem']()
      if (id !== undefined) {
        this.activeTab = `tab-${id}`
      }
    },
  },
  render(h) {
    if (Object.keys(this.items).length === 0) {
      const adminMenu = h('admin-menu', { props: { items: this.menuItems }, on: { click: this.menuItemClick } })
      this.$set(this.items, 'home', { id: 'home', component: adminMenu })
    }

    const views = new Set()
    Object.keys(this.items).forEach((menuId) => {
      views.add(createMenuItemTab(this.items[menuId], h))
    })

    return h(
      'q-tab-panels',
      {
        class: ['fit'],
        style: {
          color: 'inherit',
          background: 'inherit',
        },
        ref: 'tabPanles',
        props: { animated: true, 'keep-alive': false, infinite: true, value: this.activeTab },
      },
      [...views]
    )
  },
})
