import Vue from 'vue'
import get from 'lodash/get'
import { generateId } from '../../utils/nanoid'

const defaultButtonProps = {
  props: {
    flat: true,
    round: true,
    dense: true,
  },
  class: 'q-mr-sm',
}

export default Vue.extend({
  name: 'AdminMainToolbar',
  computed: {
    settings() {
      return this.$store.getters['admin/config/toolBarSettngs']()
    },
  },
  methods: {
    buttonClick({ id, title, component, icon = 'folder' }) {
      this.$admin.goTo({ id, title, icon, component })
    },
  },
  render(h) {
    const buttons = new Set()

    if (this.settings.showHome) {
      buttons.add(
        h(
          'q-btn',
          {
            ...defaultButtonProps,
            on: {
              click: () => this.$admin.goHome(),
            },
          },
          [h('q-icon', { props: { name: 'home' } }), h('q-tooltip', 'Home')]
        )
      )
    }

    this.settings.buttons.forEach((button) => {
      const title = get(button, 'title', undefined)
      const icon = get(button, 'icon', 'extension')
      const id = generateId()
      buttons.add(
        h(
          'q-btn',
          {
            ...defaultButtonProps,
            on: {
              click: () => this.buttonClick({ id, ...button }),
            },
          },
          [h('q-icon', { props: { name: icon } }), ...(title ? [h('q-tooltip', button.title)] : [])]
        )
      )
    })

    if (this.settings.title !== '') {
      buttons.add(h('q-toolbar-title', this.settings.title))
    }

    if (this.settings.showHide) {
      buttons.add(
        h(
          'q-btn',
          {
            props: { flat: true, round: true, dense: true },
            on: { click: () => this.$admin.goHome() },
            class: 'q-mr-sm',
          },
          [h('q-icon', { props: { name: 'menu' } }), h('q-tooltip', 'Hide panel')]
        )
      )
    }

    return h('q-toolbar', { class: 'bg-grey-7' }, [...buttons])
  },
})
