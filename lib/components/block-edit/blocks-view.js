import Vue from 'vue'
import Draggable from 'vuedraggable'
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
    Draggable,
    BlocksPalette,
    BlocksViewItem,
  },
  props: {
    blocks: {
      type: Array,
      required: true,
    },
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: 'description',
        disabled: false,
      }
    },
  },
  methods: {
    dragEnd(event) {
      console.log(event)
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
      items.add(h('blocks-view-item', { props: { ...block }, key: block.id }))
    })

    return h('div', [
      h('blocks-palette', { ref: 'palette' }),
      toolbar,
      h('q-list', { props: { dark: true } }, [
        h('draggable', { props: { options: this.dragOptions }, on: { end: this.dragEnd } }, [
          h('transition-group', { props: { type: 'transition', name: 'flip-list' } }, [...items]),
        ]),
      ]),
    ])
  },
})
