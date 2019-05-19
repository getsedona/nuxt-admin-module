import Vue from 'vue'
import AdminMenu from '../admin-menu/admin-menu'
import ItemTabContainer from './item-tab-container'

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
  mounted() {
    this.$root.$on('admin:menu-item-change', ({ tab, ...params }) => {
      this.activeTab = tab
    })
  },
  methods: {
    onMenuItemClick(item) {
      this.activeTabItem = item
      this.activeTab = 'item-tab-container'
    },
  },
  render(h) {
    const adminMenu = h('admin-menu', { on: { click: this.onMenuItemClick } })
    const itemTabContainer = h('item-tab-container', { ref: 'itemTabContainer', props: this.activeTabItem })
    const tabs = [
      h('q-tab-panel', { props: { name: 'admin-menu' }, style: { padding: 0 } }, [adminMenu]),
      h('q-tab-panel', { props: { name: 'item-tab-container' }, style: { padding: 0 } }, [itemTabContainer]),
    ]

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
