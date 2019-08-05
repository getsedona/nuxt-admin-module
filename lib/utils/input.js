import { CreateElement, VNode } from 'vue'
import get from 'lodash/get'
import upperFirst from 'lodash/upperFirst'

/**
 * Create input
 *
 * @param {'text' | 'textarea' | 'password' | 'email' | 'search' | 'tel' | 'file' | 'number' | 'url' | 'time' | 'date' | 'color'} type Input type
 * @param {import('../../types').FormField} field Field object
 * @param {CreateElement} h Create element function
 * @returns {VNode} VNode object
 */
export function createInput(type, field, h) {
  const label = get(field, 'label', upperFirst(field.name))
  return h('q-input', {
    props: { label, type, dark: true, outlined: true, filled: true, value: this.form[field.name] },
    on: {
      input: (value) => {
        this.$set(this.form, field.name, value)
      },
    },
  })
}
