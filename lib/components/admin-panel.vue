<template>
  <div id="q-app" class="admin-panel">
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
          <q-list padding dark class="full-width">
            <q-item v-ripple clickable>
              <q-item-section avatar>
                <q-icon name="list" />
              </q-item-section>

              <q-item-section>
                Posts
              </q-item-section>
            </q-item>

            <q-item v-ripple clickable>
              <q-item-section avatar>
                <q-icon name="inbox" />
              </q-item-section>

              <q-item-section>
                SEO
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </q-scroll-area>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'AdminPanel',
  }
</script>
