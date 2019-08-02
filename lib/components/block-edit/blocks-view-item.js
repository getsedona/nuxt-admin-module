import Vue from 'vue'
import get from 'lodash/get'
import BlocksViewItemForm from './blocks-view-item-form'

export default Vue.extend({
  name: 'BlocksViewItem',
  components: {
    BlocksViewItemForm,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    component: {
      type: String,
      required: true,
    },
    props: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    meta() {
      return this.$store.getters['admin/blockMetaByComponent'](this.component)
    },
  },
  render(h) {
    return h(
      'q-expansion-item',
      {
        props: {
          icon: get(this.meta, 'icon', 'extension'),
          label: get(this.meta, 'title', this.component),
          ...(this.meta.description ? { caption: this.meta.description } : {}),
          denseToggle: true,
        },
      },
      [h('blocks-view-item-form', { props: { form: this.props } })]
    )
  },
})
