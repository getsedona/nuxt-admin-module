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
  data() {
    return {
      isPaletteOpen: false,
    }
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
    const globalMenu = h('q-menu', [
      h('q-list', { style: 'min-width: 100px' }, [
        h('q-item', { props: { clickable: true } }, [h('q-item-section', 'Clear All')]),
      ]),
    ])

    const blocksPalette = h('blocks-palette', {
      ref: 'palette',
      on: { show: () => (this.isPaletteOpen = true), hide: () => (this.isPaletteOpen = false) },
    })

    const addBlockButton = h('q-btn', {
      props: { icon: 'add', color: 'primary', round: true, dense: true },
      class: 'q-ml-sm',
      on: { click: () => this.$refs.palette.show() },
    })

    const hidePaletteButton = h('q-btn', {
      props: { icon: 'close', color: 'negative', round: true, dense: true },
      class: 'q-ml-sm',
      on: {
        click: () => this.$refs.palette.hide(),
      },
    })

    const toolbar = h('q-toolbar', { class: 'q-pa-none' }, [
      ...(this.isPaletteOpen ? [hidePaletteButton] : [addBlockButton]),
      h('q-space'),
      h('q-btn', { props: { flat: true, round: true, icon: 'more_vert' }, class: ['q-mr-sm'] }, [globalMenu]),
    ])
    const items = new Set()
    this.blocks.forEach((block) => {
      items.add(h('blocks-view-item', { props: { ...block }, key: block.id }))
    })

    return h('div', [
      blocksPalette,
      toolbar,
      h('q-list', { props: { dark: true } }, [
        h('draggable', { props: { options: this.dragOptions }, on: { end: this.dragEnd } }, [
          h('transition-group', { props: { type: 'transition', name: 'flip-list' } }, [...items]),
        ]),
      ]),
    ])
  },
})
