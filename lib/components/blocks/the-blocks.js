import Vue from 'vue'
// import BlockLoadingError from './block-loading-error'

/* const getBlockComponent = (blockName) => {
  try {
    return {
      component: import(`~/components/blocks/${blockName}`),
      error: BlockLoadingError,
    }
  } catch (error) {
    console.warn(error)
  }
} */

export default Vue.extend({
  name: 'TheBlocks',
  props: {
    blocks: {
      type: Array,
      default: () => [],
    },
    tag: {
      type: String,
      default: 'div',
    },
  },
  data() {
    return {
      blockComponents: new Map(),
    }
  },
  /* created() {
    this.blocks.map((item) => {
      const componentFile = this.$store.getters['blocks/getFileByComponentName'](item.component)
      if (componentFile === undefined) {
        return
      }
      this.blockComponents.set(item.component, () => getBlockComponent(componentFile))
    })
  },
  /* computed: {
    blockComponents() {
      const blockComponents = new Map()
      this.blocks.map((item) => {
        const componentFile = this.$store.getters['blocks/getFileByComponentName'](item.component)
        if (componentFile === undefined) {
          return
        }
        blockComponents.set(item.component, () => getBlockComponent(componentFile))
      })
      return blockComponents
    },
  }, */
  /* render(h) {
    const components = new Set()
    this.blocks.forEach((block) => {
      const blockComponent = this.blockComponents.get(block.component)
      if (blockComponent instanceof Function) {
        const component = h(this.blockComponents.get(block.component), { props: { id: block.id, ...block.props } })
        components.add(component)
      } else {
        console.warn(`Component ${block.component} not found`)
      }
    })
    return h(this.tag, [...components])
  }, */
  render(h) {
    return h('div')
  },
})
