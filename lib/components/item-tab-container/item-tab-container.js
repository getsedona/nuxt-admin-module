import Vue from 'vue'
import ItemTabLoading from './item-tab-loading'
import ItemTaberror from './item-tab-error'

let componentPath = ''

export default Vue.extend({
  name: 'ItemTabContainer',
  components: {
    ItemTabLoading,
    ItemTaberror,
    AsyncTab: () => {
      return {
        component: import(`~/admin/${componentPath}`),
        loading: ItemTabLoading,
        error: ItemTaberror,
        timeout: 600,
      }
    },
  },
  props: {
    title: {
      type: String,
      required: false,
      default: 'Loading component',
    },
    subTitle: {
      type: String,
      required: false,
      default: '',
    },
    component: {
      type: String,
      required: true,
      validator: (value) => value !== '',
    },
  },
  watch: {
    component: {
      immediate: true,
      handler(value) {
        componentPath = value
      },
    },
  },
  render(h) {
    return h('div', { class: ['relative-position', 'fit'] }, [h('async-tab')])
  },
})
