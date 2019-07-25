import Vue from 'vue'

export default Vue.extend({
  name: 'Dialog',
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
    return h('q-dialog', { props: { maximized: true }, ref: 'dialog', on: { hide: this.onDialogHide } }, [
      h('q-card', { props: { dark: true }, class: ['q-dialog-plugin', 'q-dialog-plugin--dark', 'admin-panel'] }, [
        h('q-toolbar', { class: 'q-pa-none' }, [h('q-btn', { props: { icon: 'add' } })]),
        ...this.$slots.default,
      ]),
    ])
  },
})
