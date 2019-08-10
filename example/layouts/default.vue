<template>
  <div>
    <main style="padding-left:350px">
      <nuxt />
    </main>

    <template v-if="loggedIn">
      <no-ssr>
        <admin-panel />
      </no-ssr>
    </template>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  // @ToDo change import to alias
  import { AdminPanel } from './../..'

  export default {
    name: 'DefaultLayout',
    components: {
      AdminPanel,
    },
    computed: {
      ...mapState('auth', ['loggedIn']),
    },
  }
</script>
