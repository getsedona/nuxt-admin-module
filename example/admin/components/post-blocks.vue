<template>
  <div v-if="page">
    <blocks-view
      :blocks="page.content"
      @add-block="addBlock"
      @remove-block="removeBlock"
      @change-params="changeParams"
    />
  </div>
</template>

<script>
  import { BlocksView } from '../../../components'

  export default {
    name: 'PostBlocks',
    components: {
      BlocksView,
    },
    computed: {
      page() {
        return this.$store.getters['page/bySlug'](this.$route.name)
      },
    },
    methods: {
      addBlock({ id, component, props }) {
        this.$store.commit('page/ADD_BLOCK', {
          slug: this.$route.name,
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
      changeParams({ id, params }) {
        this.$store.commit('page/UPDATE_BLOCK_PARAMS', {
          slug: this.$route.name,
          id,
          params,
        })
      },
    },
  }
</script>
