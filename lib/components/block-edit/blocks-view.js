import Vue from 'vue'
import { BlocksPalette } from '../blocks-palette'
import BlocksViewItem from './blocks-view-item'

/* const buttonPropsDefault = {
  flat: true,
  round: true,
  dense: true,
} */

export default Vue.extend({
  name: 'BlocksView',
  components: {
    BlocksPalette,
    BlocksViewItem,
  },
  props: {
    blocks: {
      type: Array,
      required: true,
    },
  },
  render(h) {
    const toolbar = h('q-toolbar', [
      h('q-btn', {
        props: { label: 'Add block', color: 'primary', icon: 'add' },
        on: { click: () => this.$refs.palette.show() },
      }),
    ])
    const items = new Set()
    this.blocks.forEach((block) => {
      items.add(h('blocks-view-item', { props: block }))
    })
    return h('div', [
      h('blocks-palette', { ref: 'palette' }),
      toolbar,
      h('q-list', { props: { dark: true } }, [...items]),
    ])
  },
})
