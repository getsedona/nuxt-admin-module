import Vue from 'vue'
import { createActionButtons } from './admin-list'

export default Vue.extend({
  name: 'AdminListFullscreen',
  components: {},
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    columns: {
      type: Array,
      default: () => [],
    },
    actions: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    show() {
      this.$refs.dialog.show()
    },
    hide() {
      this.$refs.dialog.hide()
    },
    onDialogHide() {
      this.$emit('hide')
    },
    onOKClick() {
      this.$emit('ok')
      this.hide()
    },
    onCancelClick() {
      this.hide()
    },
  },
  render(h) {
    const actionButtons = createActionButtons.call(this, h)
    const toolbar = h('q-toolbar', { class: ['q-pa-none', 'bg-grey-7'] }, [
      h('q-btn', { props: { flat: true, round: true, dense: true, icon: 'close' }, on: { click: this.hide } }),
      h('q-space'),
      ...actionButtons,
    ])
    const table = h('q-table', {
      props: {
        dark: true,
        // bordered: false,
        flat: true,
        // square: true,
        // separator: 'vertical',
        'hide-header': true,
        'hide-footer': true,
        title: 'aasdasdsd',
        color: 'amber',
        columns: this.columns,
        data: this.items,
      },
    })

    return h('q-dialog', { props: { maximized: true }, ref: 'dialog', on: { hide: this.onDialogHide } }, [
      h('q-card', { props: { dark: true }, class: ['q-dialog-plugin', 'q-dialog-plugin--dark', 'admin-panel'] }, [
        toolbar,
        table,
      ]),
    ])
  },
})
