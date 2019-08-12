import Vue from 'vue'
import BlockLoadingError from './block-loading-error'

const getBlockComponent = (blockName) => ({
  component: import(`~/components/blocks/${blockName}`),
  error: BlockLoadingError,
})

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
  created() {
    this.blocks.map((item) => {
      const componentFile = this.$store.getters['blocks/getFileByComponentName'](item.component)
      if (componentFile === undefined) {
        return
      }
      this.blockComponents.set(item.component, () => getBlockComponent(componentFile))
    })
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
