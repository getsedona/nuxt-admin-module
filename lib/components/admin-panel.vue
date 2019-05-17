<template>
  <div class="admin-panel">
    <div class="admin-panel--inner text-white q-gutter-y-sm shadow-5">
      <q-scroll-area class="fit">
        <div class="row self-stretch">
          <q-toolbar>
            <q-btn flat round dense>
              <q-icon name="home" />
            </q-btn>
            <q-toolbar-title>
              &nbsp;
            </q-toolbar-title>
            <q-btn flat round dense>
              <q-icon name="menu" />
            </q-btn>
          </q-toolbar>
          <admin-router-view />
        </div>
      </q-scroll-area>
    </div>
  </div>
</template>

<script>
  import AdminRouterView from './admin-router-view'

  export default {
    name: 'AdminPanel',
    components: {
      AdminRouterView,
    },
  }
</script>
