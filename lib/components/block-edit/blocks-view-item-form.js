import Vue from 'vue'
import get from 'lodash/get'
import textField from './fields/text-field'
import radioGroupField from './fields/radio-group-field'

// const builtInFields = new Set(['text'])

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
  data() {
    return {
      formValues: {},
    }
  },
  computed: {
    metaProps() {
      const blockMeta = this.$store.getters['admin/blocks/getMetaByComponent'](this.component)
      return get(blockMeta, 'props', {})
    },
    propValues() {
      const result = {}
      Object.keys(this.metaProps).forEach((propName) => {
        const value = {
          form: get(this.formValues, propName, undefined),
          saved: get(this.form, propName, undefined),
          default: get(this.metaProps, [propName, 'default'], undefined),
        }
        result[propName] = get(value, 'form', get(value, 'saved', get(value, 'default', '')))
      })
      return result
    },
  },
  watch: {
    formValues: {
      deep: true,
      handler(params) {
        this.__changeParams(params) // { [name:string]: [value: any] }
      },
    },
  },
  methods: {
    __changeParams(params) {
      this.$emit('change', params)
    },
  },
  render(h) {
    const items = []
    for (const propName of Object.keys(this.metaProps)) {
      const propType = get(this.metaProps, [propName, 'type'], 'text')
      switch (propType) {
        case 'text':
          items.push(textField.call(this, { name: propName }, h))
          break
        case 'radio-group':
          items.push(radioGroupField.call(this, { name: propName }, h))
          break
        default:
          console.log('AAAAAA')
          break
      }
    }

    if (items.size === 0) {
      items.push(h('div', { class: 'q-pa-sm' }, "Block has't params"))
    }

    return h('q-card', { class: ['bg-grey-9', 'q-gutter-sm', 'q-pa-sm'] }, items)
  },
})
