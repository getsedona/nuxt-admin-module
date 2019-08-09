import Vue, { VNode, CreateElement } from 'vue'
import get from 'lodash/get'
import upperFirst from 'lodash/upperFirst'

/**
 * Create input
 *
 * @param {'text' | 'textarea' | 'password' | 'email' | 'search' | 'tel' | 'file' | 'number' | 'url' | 'time' | 'date' | 'color'} type Input type
 * @param {object} field Field object
 * @param {CreateElement} h Create element function
 * @returns {VNode} VNode object
 */
function createInput(type, field, h) {
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

export default Vue.extend({
  name: 'AdminForm',
  props: {
    schema: {
      type: Object,
      required: true,
    },
    data: {
      type: Object,
      default: () => {},
    },
    isNew: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      form: {},
    }
  },
  created() {
    this.schema.fields.forEach((field) => {
      const value = this.isNew ? get(this.data, field.name, get(field, 'value', '')) : get(this.data, field.name, '')
      this.$set(this.form, field.name, value)
    })
  },
  methods: {
    submit() {
      this.$emit('submit', { form: this.form })
    },
  },
  render(h) {
    const inputs = new Set()
    this.schema.fields.forEach((field) => {
      switch (field.type) {
        case 'text':
          inputs.add(createInput.call(this, 'text', field, h))
          break
        case 'textarea':
          inputs.add(createInput.call(this, 'textarea', field, h))
          break
        case 'password':
          inputs.add(createInput.call(this, 'password', field, h))
          break
        case 'email':
          inputs.add(createInput.call(this, 'email', field, h))
          break
        case 'search':
          inputs.add(createInput.call(this, 'search', field, h))
          break
        case 'tel':
          inputs.add(createInput.call(this, 'tel', field, h))
          break
        case 'file':
          inputs.add(createInput.call(this, 'file', field, h))
          break
        case 'number':
          inputs.add(createInput.call(this, 'number', field, h))
          break
        case 'url':
          inputs.add(createInput.call(this, 'url', field, h))
          break
        case 'time':
          inputs.add(createInput.call(this, 'time', field, h))
          break
        case 'date':
          inputs.add(createInput.call(this, 'date', field, h))
          break
        case 'color':
          inputs.add(createInput.call(this, 'color', field, h))
          break
      }
    })
    const actions = h('div', { class: 'q-gutter-sm' }, [
      h('q-btn', {
        props: { label: 'OK', type: 'submit', color: 'primary' },
        class: 'full-width',
      }),
      h('q-btn', { props: { label: 'Cancel', type: 'reset', flat: true }, class: 'full-width' }),
    ])
    return h('div', { class: 'q-pa-md' }, [
      h(
        'q-form',
        {
          class: 'q-gutter-md',
          ref: 'form',
          props: { autofocus: true },
          on: { submit: () => this.submit(), reset: () => this.$emit('reset') },
        },
        [...inputs, actions]
      ),
    ])
  },
})
