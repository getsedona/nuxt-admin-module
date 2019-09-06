import Vue from 'vue'
import AdminRouterView from './admin-router-view'
import AdminMainToolbar from './admin-main-toolbar'

export default Vue.extend({
  name: 'AdminPanel',
  components: {
    RouterView: AdminRouterView,
    MainToolbar: AdminMainToolbar,
  },
  render(h) {
    const mainToolbar = h('main-toolbar')
    const routerView = h('router-view')

    const panel = h('div', { class: ['row', ' self-stretch', 'fit'] }, [mainToolbar, routerView])

    return h('div', { class: 'admin-panel' }, [
      h('div', { class: ['admin-panel--inner', 'text-white', 'q-gutter-y-sm', 'shadow-5'], style: 'z-index:1000' }, [
        panel,
      ]),
    ])
  },
})
