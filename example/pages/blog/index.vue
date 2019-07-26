<template>
  <main class="main">
    <the-header />
    Blog posts
  </main>
</template>

<script>
  import TheHeader from '~/components/the-header'

  export default {
    name: 'BlogPage',
    components: {
      TheHeader,
    },
  }
</script>
