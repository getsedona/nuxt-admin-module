import get from 'lodash/get'
import upperFirst from 'lodash/upperFirst'

/**
 * Create text field
 *
 * @exports
 * @param {{name: string}} { name } field params
 * @param {import('vue').CreateElement} h create element function
 * @returns {import('vue').VNode} VNode
 */
export default function({ name }, h) {
  return h('q-input', {
    props: {
      dark: true,
      outlined: true,
      filled: true,
      value: this.propValues[name],
      label: get(this.metaProps, [name, 'label'], upperFirst(name)),
      type: get(this.metaProps, [name, 'type'], 'text'),
    },
    on: {
      input: (value) => this.$set(this.formValues, name, value),
    },
  })
}

/* export default Vue.extend({
  name: 'TextField',
  props: {

  },
  render(h) {

  },
})
*/
