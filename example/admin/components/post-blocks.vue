<template>
  <div v-if="page.blocks">
    <blocks-view
      :blocks="page.blocks"
      @add-block="addBlock"
      @remove-block="removeBlock"
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
    methods: {
      addBlock({ id, component, props }) {
        this.page.blocks.push({
          id,
          component,
          props,
        })
      },
      removeBlock({ id }) {
        const index = this.page.blocks.findIndex((item) => item.id === id)
        if (index !== undefined) {
          this.page.blocks.splice(index, 1)
        }
      },
    },
  }
</script>
