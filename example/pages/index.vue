<template>
  <main class="main">
    <the-header />
    <the-blocks
      :blocks="page.blocks"
    />
  </main>
</template>

<script>
  import { TheBlocks } from '../..'
  import TheHeader from '~/components/the-header'

  export default {
    name: 'HomePage',
    components: {
      TheHeader,
      TheBlocks,
    },
    data() {
      return {
        page: {},
      }
    },
    async asyncData({ app }) {
      const page = await app.$axios.$get('/pages/index.json')
      return {
        page,
      }
    },
  }
</script>
