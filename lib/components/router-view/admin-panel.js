import Vue from 'vue'
import AdminRouterView from './admin-router-view'
import AdminMainToolbar from './admin-main-toolbar'

export default Vue.extend({
  name: 'AdminPanel',
  components: {
    AdminRouterView,
    AdminMainToolbar,
  },
  render(h) {
    const mainToolBar = h('admin-main-toolbar')
    const routerView = h('admin-router-view')

    return h('div', { class: 'admin-panel' }, [
      h('div', { class: ['admin-panel--inner', 'text-white', 'q-gutter-y-sm', 'shadow-5'] }, [
        h('div', { class: 'fit' }, [h('div', { class: ['row', 'self-stretch', 'fit'] }, [mainToolBar, routerView])]),
      ]),
    ])
  },
})
