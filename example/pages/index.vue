<template>
  <main class="main">
    <the-header />

    <the-blocks :blocks="page.content || []" />
  </main>
</template>

<script>
  import TheHeader from '~/components/the-header'

  export default {
    name: 'HomePage',
    components: {
      TheHeader,
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
