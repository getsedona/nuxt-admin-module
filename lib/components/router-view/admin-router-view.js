import Vue from 'vue'
import { mapState } from 'vuex'
import { AdminMenu } from '../admin-menu'
import { ItemTabContainer } from './../item-tab-container'

export default Vue.extend({
  name: 'AdminRouterView',
  components: {
    AdminMenu,
    ItemTabContainer,
  },
  data() {
    return {
      activeTab: 'admin-menu',
      activeTabItem: {},
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
    onMenuItemClick(item) {
      this.activeTabItem = item
      if (item.type === 'section') {
        this.activeTabItem.component = AdminMenu
      }
      this.activeTab = 'item-tab-container'
    },
  },
  render(h) {
    /* function createMenuItemTab(menuItem) {
      const tabPanelProps = {
        'keep-alive': false,
        animated: true,
        infinite: true,
      }
      const itemTabContainer = h('item-tab-container', { props: this.activeTabItem })
      const menuItemPanel = h(
        'q-tab-panel',
        { props: { name: 'item-tab-container', ...tabPanelProps }, style: { padding: 0 } },
        [itemTabContainer]
      )
      return menuItemPanel
    } */

    const adminMenu = h('admin-menu', { props: { items: this.menuItems }, on: { click: this.onMenuItemClick } })
    const itemTabContainer = h('item-tab-container', { props: this.activeTabItem })
    const tabPanelProps = {
      'keep-alive': false,
      animated: true,
      infinite: true,
    }
    const tabs = [
      h('q-tab-panel', { props: { name: 'admin-menu', ...tabPanelProps }, style: { padding: 0 } }, [adminMenu]),
      h('q-tab-panel', { props: { name: 'item-tab-container', ...tabPanelProps }, style: { padding: 0 } }, [
        itemTabContainer,
      ]),
    ]

    // this.menuItems.forEach((menuItem) => {})

    return h(
      'q-tab-panels',
      {
        class: ['fit'],
        style: {
          color: 'inherit',
          background: 'inherit',
        },
        props: { animated: true, value: this.activeTab },
      },
      tabs
    )
  },
})
