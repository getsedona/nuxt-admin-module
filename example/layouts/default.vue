<template>
  <div>
    <main style="padding-left:350px">
      <nuxt />
    </main>

    <template v-if="loaded">
      <client-only>
        <admin-panel />
      </client-only>
    </template>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { AdminPanel } from '@getsedona/nuxt-admin-module/components'

  export default {
    name: 'DefaultLayout',
    components: {
      AdminPanel,
    },
    computed: {
      ...mapState('admin', ['loaded']),
    },
  }
</script>
