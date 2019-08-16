import Vue from 'vue'
import get from 'lodash/get'
import upperFirst from 'lodash/upperFirst'
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
      const propType = get(this.metaProps, [propName, 'type'], 'text')
      // const propValue = get(this.form, propName, '')
      switch (propType) {
        case 'text':
          items.add(createInput.call(this, 'text', { name: 'ads' }, h))
          break
        case 'radio-group': {
          const options = get(this.metaProps, [propName, 'options'], [])
          const radioOptions = []
          options.forEach((item) => {
            switch (typeof item) {
              case 'string':
                radioOptions.push({ label: upperFirst(item), value: item })
                break
              case 'object':
                radioOptions.push(item)
                break
            }
          })
          const component = h('q-option-group', {
            props: {
              type: 'radio',
              dark: true,
              options: radioOptions,
              value: this.propValues[propName],
            },
            on: {
              input: (value) => {
                this.$set(this.formValues, propName, value)
              },
            },
          })
          items.add(component)
          break
        }
      }
    })
    if (items.size === 0) {
      items.add(h('div', { class: 'q-pa-sm' }, "Block has't params"))
    }

    return h('q-card', { class: ['bg-grey-9', 'q-gutter-sm', 'q-pa-sm'] }, [...items])
  },
})
