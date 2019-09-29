import Vue from 'vue'

export default Vue.extend({
  name: 'AdminItemTabError',
  functional: true,
  render(h) {
    return h('div', { class: ['q-pa-lg', 'text-red'] }, 'Component Loading Error')
  },
})
