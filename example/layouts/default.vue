<template>
  <div style="padding-left:350px">
    <nuxt />

    <template v-if="loaded">
      <client-only>
        <admin-panel />
      </client-only>
    </template>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'DefaultLayout',
    computed: {
      ...mapState('admin', ['loaded']),
    },
  }
</script>
