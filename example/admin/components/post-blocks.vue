<template>
  <div v-if="page.blocks">
    <blocks-view
      :blocks="page.blocks"
    />
  </div>
</template>

<script>
  import { BlocksView } from '../../..'

  export default {
    name: 'PostBlocks',
    components: {
      BlocksView,
    },
    data() {
      return {
        page: {},
      }
    },
    async created() {
      this.page = await this.$axios.$get('/pages/index.json')
    },
  }
</script>
