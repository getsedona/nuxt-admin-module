<template>
  <main class="main">
    <the-header />
    <the-blocks
      :blocks="blocks"
    />
  </main>
</template>

<script>
  import { TheBlocks } from '../..'
  import TheHeader from '~/components/the-header'

  const blocks = [
    { component: 'TextBlock', props: { text: 'Text' } },
  ]

  export default {
    name: 'HomePage',
    components: {
      TheHeader,
      TheBlocks,
    },
    data() {
      return {
        blocks,
      }
    },
  }
</script>
