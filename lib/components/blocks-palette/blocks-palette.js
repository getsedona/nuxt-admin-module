import Vue from 'vue'
import { mapState, mapGetters } from 'vuex'
import upperFirst from 'lodash/upperFirst'
import { generateId } from '../../utils/nanoid'
import BlocksPaletteItem from './blocks-palette-item'
import BlocksPaletteSearch from './blocks-palette-search'

export default Vue.extend({
  name: 'BlocksPalette',
  components: {
    BlocksPaletteItem,
    BlocksPaletteSearch,
  },
  data() {
    return {
      search: '',
    }
  },
  computed: {
    ...mapState('admin/blocks', { blocks: 'items' }),
    ...mapGetters('admin/blocks', { groups: 'blockGroups' }),
  },
  methods: {
    show() {
      this.$el.classList.remove('hidden')
      this.$refs.searchInput.focus()
      this.$emit('show')
    },
    hide() {
      this.$refs.searchInput.clear()
      this.$el.classList.add('hidden')
      this.$emit('hide')
    },
    addBlock(blockName) {
      this.$emit('add-block', { name: blockName })
    },
  },
  render(h) {
    /// Create grouped blocks
    /// {
    ///  [groupName: string = 'general']: Map<{meta: BlockMeta, component: VNode}>
    /// }
    const groupedBlocks = Object.assign({}, this.groups)
    if (Array.isArray(this.blocks)) {
      this.blocks.forEach((blockMeta) => {
        const groupName = blockMeta.group || 'general'
        if (!(groupedBlocks[groupName] instanceof Map)) {
          groupedBlocks[groupName] = new Map()
        }
        groupedBlocks[groupName].set(generateId(), {
          meta: blockMeta,
          component: h('blocks-palette-item', { props: blockMeta, on: { click: ({ name }) => this.addBlock(name) } }),
        })
      })
    }

    /// Search process
    const blockIdsFiltered = new Set()
    if (this.search !== '') {
      const searchRegExp = new RegExp(`^(.+)?${this.search}(.+)?$`, 'gi')
      Object.keys(groupedBlocks).forEach((groupName) => {
        groupedBlocks[groupName].forEach(({ meta }, id) => {
          if (searchRegExp.test(meta.title || '') || searchRegExp.test(meta.description || '')) {
            blockIdsFiltered.add(id)
          }
        })
      })
    }

    /// Create section VNodes
    const sections = new Map()
    if (this.groups.size > 1) {
      this.groups.forEach((groupName) => {
        sections.set(groupName, h('q-item-label', { props: { header: true } }, upperFirst(groupName)))
      })
    }

    const items = new Set()
    if (sections.size > 0) {
      sections.forEach((sectionVNode, groupName) => {
        if (groupedBlocks[groupName].size > 0) {
          groupedBlocks[groupName].forEach(({ component }, id) => {
            // if search is inactive
            if (this.search === '') {
              items.add(sectionVNode)
              items.add(component)
            } else if (blockIdsFiltered.has(id)) {
              items.add(sectionVNode)
              items.add(component)
            }
          })
        }
      })
      // if sections does not exists
    } else if (Object.keys(groupedBlocks).length === 1) {
      groupedBlocks.general.forEach(({ component }, id) => {
        // if search is inactive
        if (this.search === '') {
          items.add(component)
        } else if (blockIdsFiltered.has(id)) {
          items.add(component)
        }
      })
    }

    return h('div', { class: ['admin-blocks-palette', 'bg-grey-9', 'shadow-5', 'hidden', 'z-top'] }, [
      h('q-toolbar', { class: 'bg-grey-7' }, [
        h('q-toolbar-title', 'Select block'),
        h('q-btn', { props: { flat: true, round: true, dense: true }, on: { click: this.hide } }, [
          h('q-icon', { props: { name: 'arrow_back' } }),
        ]),
      ]),
      h('blocks-palette-search', { ref: 'searchInput', on: { change: (value) => (this.search = value) } }),
      h('q-list', { props: { bordered: false, padding: true, dark: true } }, [...items]),
    ])
  },
})
