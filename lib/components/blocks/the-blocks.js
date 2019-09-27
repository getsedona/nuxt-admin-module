import Vue from 'vue'

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
  render(h) {
    const components = new Set()
    this.blocks.forEach((block) => {
      const component = h(block.component, { props: { id: block.id, ...block.props } })
      components.add(component)
    })
    return h(this.tag, [...components])
  },
})
