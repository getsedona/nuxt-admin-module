import Vue from 'vue'

export default Vue.extend({
  name: 'BlocksViewItemForm',
  props: {
    form: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    changeParam(name, value) {
      this.$emit('change', {
        param: name,
        value,
      })
    },
  },
  render(h) {
    return h('q-card', { class: 'bg-grey-8' }, 'Form')
  },
})
