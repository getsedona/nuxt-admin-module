import Vue from 'vue'
import { BlocksPalette } from '../blocks-palette'

/* const buttonPropsDefault = {
  flat: true,
  round: true,
  dense: true,
} */

export default Vue.extend({
  name: 'BlocksView',
  components: {
    BlocksPalette,
  },
  render(h) {
    const toolbar = h('q-toolbar', [
      h('q-btn', {
        props: { label: 'Add block', color: 'primary', icon: 'add' },
        on: { click: () => this.$refs.palette.show() },
      }),
    ])
    return h('div', [h('blocks-palette', { ref: 'palette', class: ['hidden', 'z-top'] }), toolbar])
  },
})
