<template>
  <div style="padding-left:350px">
    <nuxt />
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
