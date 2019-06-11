import Vue from 'vue'
import ItemTabLoading from './item-tab-loading'
import ItemTaberror from './item-tab-error'

export default Vue.extend({
  name: 'ItemTabContainer',
  components: {
    ItemTabLoading,
    ItemTaberror,
    AsyncTab: () => ({
      component: new Promise(async (resolve, reject) => {
        try {
          const result = await import(`${this.component}`)
          resolve(result)
        } catch (error) {
          console.error(error)
        }
      }),
      loading: ItemTabLoading,
      error: ItemTaberror,
      timeout: 600,
    }),
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
  render(h) {
    return h('div', { class: ['relative-position', 'fit'] }, [h('async-tab')])
  },
})
