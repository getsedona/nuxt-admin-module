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
      activeTab: 'tab-home', // Tab ID
      items: {}, // Menu Items
    }
  },
  computed: {
    ...mapState({
      menuItems: (state) => state?.admin?.config?.data?.items || [],
      breadcrumbs: (state) => state?.admin?.breadcrumbs || [],
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
  render() {
    const itemKeys = Object.keys(this.items)

    if (itemKeys.length === 0) {
      const adminMenu = <admin-menu items={this.menuItems} on-click={this.menuItemClick} />
      this.$set(this.items, 'home', { id: 'home', component: adminMenu })
    }

    const views = new Set()

    itemKeys.forEach((menuId) => {
      const item = this.items[menuId]
      views.add(
        <q-tab-panel name={`tab-${item.id}`} style="padding:5px 0px">
          <item-tab-container
            title={item?.title || ''}
            subTitle={item?.subTitle || ''}
            icon={item?.icon || 'folder'}
            component={item.component}
            items={item?.items || []}
            params={item?.params || {}}
          />
        </q-tab-panel>
      )
    })

    return (
      <q-tab-panels
        class="fit"
        style="color:inherit;background:inherit;"
        animated={true}
        keepAlive={false}
        infinite={true}
        value={this.activeTab}
      >
        {...views}
      </q-tab-panels>
    )
  },
})
