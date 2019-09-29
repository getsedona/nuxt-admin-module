import Vue from 'vue'

export default Vue.extend({
  name: 'TheBlocks',
  functional: true,
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
  render(h, { props }) {
    const components = new Set()
    props.blocks.forEach((block) => {
      const component = h(block.component, { props: { id: block.id, ...block.props } })
      components.add(component)
    })
    return h(props.tag, [...components])
  },
})
