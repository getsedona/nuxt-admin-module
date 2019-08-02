import Vue from 'vue'

export default Vue.extend({
  name: 'BlocksViewItemForm',
  props: {
    form: {
      type: Object,
      default: () => {},
    },
  },
  render(h) {
    return h('q-card', { class: 'bg-grey-8' }, 'Form')
  },
})
