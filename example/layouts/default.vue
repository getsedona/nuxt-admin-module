<template>
  <div>
    <main style="padding-left:350px">
      <nuxt />
    </main>

    <no-ssr>
      <admin-panel />
    </no-ssr>
  </div>
</template>

<script>
  // @ToDo change import to alias
  import { AdminPanel } from './../..'

  export default {
    name: 'DefaultLayout',
    components: {
      AdminPanel,
    },
  }
</script>
