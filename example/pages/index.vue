<template>
  <main class="main">
    <the-header />

    <template v-if="page">
      <the-blocks
        :blocks="page.content"
      />
    </template>
  </main>
</template>

<script>
  // import { TheBlocks } from '@getsedona/nuxt-admin-module/components'
  import TheHeader from '~/components/the-header'

  export default {
    name: 'HomePage',
    components: {
      TheHeader,
      // TheBlocks,
    },
    computed: {
      page() {
        return this.$store.getters['page/bySlug']('index')
      },
    },
    async fetch({ store }) {
      await store.dispatch('page/load', { slug: 'index' })
    },
  }
</script>
