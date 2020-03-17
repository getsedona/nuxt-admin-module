import Vue from 'vue'
import AdminRouterView from './admin-router-view'
import AdminMainToolbar from './admin-main-toolbar'

export default Vue.extend({
  name: 'AdminPanel',
  functional: true,
  components: {
    RouterView: AdminRouterView,
    MainToolbar: AdminMainToolbar,
  },
  render() {
    return (
      <div id="q-app" class="admin-panel q-dark">
        <div class="admin-panel--inner text-white q-gutter-y-sm shadow-5" style="z-index:1000">
          <div class="row self-stretch fit">
            <main-toolbar/>
            <router-view/>
          </div>
        </div>
      </div>
    )
  },
})
