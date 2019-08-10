import Vue from 'vue'
import get from 'lodash/get'
import { createInput } from '../../utils/input'

export default Vue.extend({
  name: 'BlocksViewItemForm',
  props: {
    component: {
      type: String,
      required: true,
    },
    form: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    metaProps() {
      const blockMeta = this.$store.getters['admin/blocks/getMetaByComponent'](this.component)
      return get(blockMeta, 'props', {})
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
    const items = new Set()
    Object.keys(this.metaProps).forEach((propName) => {
      switch (propName) {
        case 'text':
          items.add(createInput.call(this, 'text', { name: 'ads' }, h))
          break
      }
    })
    if (items.size === 0) {
      items.add(h('div', { class: 'q-pa-sm' }, "Block has't params"))
    }

    return h('q-card', { class: ['bg-grey-9', 'q-gutter-sm', 'q-pa-sm'] }, [...items])
  },
})
