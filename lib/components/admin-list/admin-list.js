import Vue from 'vue'
import get from 'lodash/get'
import ListFullscreen from './admin-list-fullscreen'

const buttonPropsDefault = {
  flat: true,
  round: true,
  dense: true,
}
const actionButtons = []

/**
 * Create buttons for toolbar
 *
 * @exports
 * @param {Function} h create element function
 * @returns {import('vue').VNode[]} buttons array
 */
export function createActionButtons(h) {
  if (actionButtons.length > 0) {
    return actionButtons
  }
  this.actions.forEach((action) => {
    const title = get(action, 'title', '')
    const icon = get(action, 'icon', 'extensions')
    const options = { props: { ...buttonPropsDefault, icon } }
    if (action.click instanceof Function) {
      options.on = { click: action.click }
    }
    actionButtons.push(h('q-btn', options, [...(title !== '' ? [h('q-tooltip', title)] : [])]))
  })
  return actionButtons
}

export default Vue.extend({
  name: 'AdminList',
  components: {
    ListFullscreen,
  },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    columns: {
      type: Array,
      default: () => [],
    },
    titleFieldName: {
      type: [String, Function],
      default: 'title',
    },
    subtitleFieldName: {
      type: [String, Function],
      default: '',
    },
    actions: {
      type: Array,
      default: () => [],
    },
    hideFullScreen: {
      type: Boolean,
      default: false,
    },
    itemClick: {
      type: Function,
      default: () => void 0,
    },
  },
  methods: {
    openFullScreen() {
      this.$q.dialog({
        dark: true,
        maximized: true,
        class: 'admin-panel',
        root: this.$root,
        component: ListFullscreen,
        items: this.items,
        columns: this.columns,
        actions: this.actions,
      })
    },
  },
  render(h) {
    const actionButtons = createActionButtons.call(this, h)
    const toolbar = h('q-toolbar', { class: 'q-pa-none' }, [
      ...actionButtons,
      h('q-space'),
      ...(!this.hideFullScreen
        ? [
          h('q-btn', { props: { ...buttonPropsDefault, icon: 'fullscreen' }, on: { click: this.openFullScreen } }, [
            h('q-tooltip', 'Fullscreen mode'),
          ]),
        ]
        : []),
    ])

    const items = []
    this.items.forEach((item) => {
      let title = '<NO TITLE FIELD NAME PROVIDED>'
      switch (typeof this.titleFieldName) {
        case 'string':
          title = get(item, this.titleFieldName, title)
          break
        case 'function':
          title = this.titleFieldName(item)
          break
      }
      title = h('q-item-label', title)

      let subTitle = ''
      if (this.subtitleFieldName !== '') {
        switch (typeof this.subtitleFieldName) {
          case 'string':
            subTitle = get(item, this.subtitleFieldName, 'BAD SUBTITLE FIELD NAME PROVIDED>')
            break
          case 'function':
            subTitle = this.subtitleFieldName(item)
            break
        }
      }
      if (subTitle !== '') {
        subTitle = h('q-item-label', { props: { caption: true } }, subTitle)
      }

      const listItem = h(
        'q-item',
        { props: { clickable: true }, on: { click: () => this.$emit('item-click', item) } },
        [h('q-item-section', [title, ...(typeof subTitle === 'object' ? [subTitle] : [])])]
      )
      items.push(listItem)
    })
    const list = h('q-list', { props: { separator: true, dark: true } }, items)

    return h('div', {}, [toolbar, list])
  },
})
