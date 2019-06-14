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
      default: '',
    },
    subTitle: {
      type: String,
      required: false,
      default: '',
    },
    icon: {
      type: String,
      required: false,
      default: 'folder',
    },
    component: {
      type: [String, Function, Object],
      required: true,
      validator: (value) => value !== '',
    },
    items: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  watch: {
    component: {
      immediate: true,
      handler(value) {
        if (typeof value === 'string') {
          componentPath = value
        }
      },
    },
  },
  render(h) {
    const viewProps = {
      items: this.items,
    }
    let view = null
    switch (typeof this.component) {
      case 'string':
        view = h('async-tab')
        break
      case 'function':
        view = h(this.component, { props: viewProps })
        break
      case 'object':
        view = this.component
        break
    }

    if (this.title !== '') {
      const header = h('q-toolbar', { props: { inset: false } }, [
        h('q-btn', { props: { flat: true, round: true, dense: true, icon: this.icon } }),
        h('q-toolbar-title', { props: { shrink: true } }, this.title),
      ])
      const separator = h('q-separator', { props: { dark: true, horizontal: true, inset: true } })

      return h('div', { class: ['fit'] }, [header, separator, view])
    }

    return h('div', { class: ['fit'] }, [view])
  },
})
