import Vue from 'vue'
import ItemTaberror from './item-tab-error'
import ItemTabLoading from './item-tab-loading'

const getTabComponent = (componentPath) => ({
  component: import(`~/admin/${componentPath}`),
  loading: ItemTabLoading,
  error: ItemTaberror,
  timeout: 600,
})

export default Vue.extend({
  name: 'ItemTabContainer',
  props: {
    title: {
      type: String,
      default: '',
    },
    subTitle: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: 'folder',
    },
    component: {
      type: [String, Function, Object],
      required: true,
      validator: (value) => value !== '',
    },
    items: {
      type: Array,
      default: () => [],
    },
    params: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      asyncComponent: null,
    }
  },
  created() {
    if (typeof this.component === 'string') {
      this.asyncComponent = () => getTabComponent(this.component)
    }
  },
  render(h) {
    const viewProps = {
      items: this.items,
    }
    let view
    switch (typeof this.component) {
      case 'string':
        view = h(this.asyncComponent, { props: this.params })
        break
      case 'function':
        view = h(this.component, { props: viewProps })
        break
      case 'object':
        view = this.component
        break
    }

    // home tab
    if (this.title === '') {
      return h('div', { class: ['fit'] }, [view])
    }

    const header = h('q-toolbar', { props: { inset: false } }, [
      h('q-btn', { props: { flat: true, round: true, dense: true, icon: this.icon } }),
      h('q-toolbar-title', { props: { shrink: true } }, this.title),
    ])
    const separator = h('q-separator', { props: { dark: true, horizontal: true, inset: false } })
    return h('div', { class: ['fit'] }, [header, separator, view])
  },
})
