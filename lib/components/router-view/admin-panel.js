import Vue from 'vue'
import AdminRouterView from './admin-router-view'
import AdminMainToolbar from './admin-main-toolbar'

export default Vue.extend({
  name: 'AdminPanel',
  components: {
    RouterView: AdminRouterView,
    MainToolbar: AdminMainToolbar,
  },
  render() {
    return (<div class="admin-panel">
      <div class="admin-panel--inner text-white q-gutter-y-sm shadow-5">
        <div class="row self-stretch fit">
          <MainToolbar />
          <RouterView />
        </div>
      </div>
    </div>)
  },
})
