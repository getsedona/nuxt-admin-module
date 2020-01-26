import get from 'lodash/get'
import upperFirst from 'lodash/upperFirst'

/**
 * Create radio group widget
 *
 * @exports
 * @param {{name: string}} { name } field params
 * @param {import('vue').CreateElement} h create element function
 * @returns {import('vue').VNode} VNode
 */
export default function({ name }, h) {
  const options = get(this.metaProps, [name, 'options'], [])
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
      value: this.propValues[name],
    },
    on: {
      input: (value) => {
        this.$set(this.formValues, name, value)
      },
    },
  })
  return h('q-field', {
    props: {
      label: get(this.metaProps, [name, 'label'], upperFirst(name)),
      stackLabel: true,
      dark: true,
      filled: true,
    },
    scopedSlots: {
      control: () => [component],
    },
  })
}
