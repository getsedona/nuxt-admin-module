import Vue from 'vue'

export default Vue.extend({
  name: 'ItemTabContainer',
  props: {
    title: {
      type: String,
      required: false,
      default: 'Loading component',
    },
  },
  methods: {
    loadTabComponent() {
      console.log('load tab component')
    },
  },
  render(h) {
    return h('div', this.title)
  },
})
