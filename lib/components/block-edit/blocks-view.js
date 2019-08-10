import Vue from 'vue'
import Draggable from 'vuedraggable'
import { BlocksPalette } from '../blocks-palette'
import { generateId } from '../../utils/nanoid'
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
    /**
     * Check for exists block on project by name
     *
     * @param {string} [componentName=''] component name
     * @returns {boolean} true if exists
     */
    isBlockExists(componentName = '') {
      return this.$store.getters['admin/blocks/hasBlock'](componentName)
    },
    /**
     * Adding block from Blocks Palette
     *
     * @param {string} blockName component name
     */
    addBlock(blockName) {
      this.$emit('add-block', {
        id: generateId(),
        component: blockName,
        props: {},
      })
    },
    /**
     * Removing block event
     *
     * @param {string} id block id
     */
    removeBlock(id) {
      this.$emit('remove-block', { id })
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
      on: {
        show: () => (this.isPaletteOpen = true),
        hide: () => (this.isPaletteOpen = false),
        'add-block': ({ name }) => this.addBlock(name),
      },
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
      if (this.isBlockExists(block.component)) {
        items.add(
          h('blocks-view-item', {
            props: { ...block },
            key: block.id,
            on: { remove: ({ id }) => this.removeBlock(id) },
          })
        )
      } else {
        console.warn(`Block with name ${block.component} not exists in project`)
      }
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
