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
      menuItems: (state) => state.admin.menuItems,
    }),
  },
  mounted() {
    this.$root.$on('admin:menu-item-change', ({ tab, ...params }) => {
      this.activeTab = tab
    })
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
    const adminMenu = h('admin-menu', { props: { items: this.menuItems }, on: { click: this.onMenuItemClick } })
    const itemTabContainer = h('item-tab-container', { ref: 'itemTabContainer', props: this.activeTabItem })
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
