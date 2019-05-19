import Vue from 'vue'

export default Vue.extend({
  name: 'AdminItemTabLoading',
  render(h) {
    return h('q-circular-progress', {
      props: {
        indeterminate: true,
        size: '40px',
        thickness: 0.4,
        'font-size': '50px',
        color: 'lime',
        'track-color': 'grey-3',
        'center-color': 'grey-8',
      },
      class: ['q-ma-md', 'absolute-center'],
    })
  },
})
