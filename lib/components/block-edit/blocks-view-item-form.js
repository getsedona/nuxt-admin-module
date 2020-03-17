import Vue from 'vue'
import textField from './fields/text-field'
import radioGroupField from './fields/radio-group-field'

const getFieldComponent = (componentPath) => ({
  component: import(`~/admin/fields/${componentPath}`),
  timeout: 600,
})

const builtInFields = new Set(['text', 'radio-group'])

export default Vue.extend({
  name: 'BlocksViewItemForm',
  components: {},
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
      customFields: new Map(),
    }
  },
  computed: {
    metaProps() {
      const blockMeta = this.$store.getters['admin/blocks/getMetaByComponent'](this.component)
      return blockMeta?.props || {}
    },
    propValues() {
      const result = {}
      Object.keys(this.metaProps).forEach((propName) => {
        const value = {
          form: this.formValues?.[propName] || undefined,
          saved: this.form?.[propName] || undefined,
          default: this.metaProps?.[propName]?.default || undefined,
        }
        result[propName] = value?.form || value?.saved || value?.default || ''
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
  created() {
    const types = Object.keys(this.metaProps).map((propName) => this.metaProps?.[propName]?.type || 'text')
    const customFieldTypes = types.filter((item) => !builtInFields.has(item))
    for (const fieldType of customFieldTypes) {
      this.customFields.set(fieldType, () => getFieldComponent(fieldType))
    }
  },
  methods: {
    __changeParams(params) {
      this.$emit('change', params)
    },
  },
  render(h) {
    const items = []
    for (const propName of Object.keys(this.metaProps)) {
      const propType = this.metaProps?.[propName]?.type || 'text'
      switch (propType) {
        case 'text':
          items.push(textField.call(this, { name: propName }, h))
          break
        case 'radio-group':
          items.push(radioGroupField.call(this, { name: propName }, h))
          break
        default: {
          console.warn(`${propType} is unknown custom field`)
          items.push(h(this.customFields.get(propType)))
          break
        }
      }
    }

    if (items.length === 0) {
      items.push(<div class="q-pa-sm">Block has't params</div>)
    }

    return <q-card class="bg-grey-9 q-gutter-sm q-pa-sm">{items}</q-card>
  },
})
