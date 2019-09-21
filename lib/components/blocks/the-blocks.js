import Vue from 'vue'
import BlockLoadingError from './block-loading-error'

const getBlockComponent = (blockName) => {
  try {
    return {
      component: import(`~/components/blocks/${blockName}`),
      error: BlockLoadingError,
    }
  } catch (error) {
    console.warn(error)
  }
}

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
  computed: {
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
  },
  render(h) {
    const components = new Set()
    this.blocks.forEach((block) => {
      const component = h(this.blockComponents.get(block.component), { props: { id: block.id, ...block.props } })
      components.add(component)
    })
    return h(this.tag, [...components])
  },
})
