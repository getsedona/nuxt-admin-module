import upperFirst from 'lodash/upperFirst'

/**
 * Create radio group widget
 *
 * @exports
 * @param {{name: string}} { name } field params
 * @param {import('vue').CreateElement} h create element function
 * @returns {import('vue').VNode} VNode
 */
// eslint-disable-next-line no-unused-vars
export default function({ name }, h) {
  const options = this.metaProps?.[name]?.options || []
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

  const component = (
    <q-option-group
      type="radio"
      dark={true}
      options={radioOptions}
      value={this.propValues[name]}
      on-input={(value) => this.$set(this.formValues, name, value)}
    />
  )

  return (
    <q-field
      label={this.metaProps?.[name]?.label || upperFirst(name)}
      stack-label={true}
      dark={true}
      filled={true}
      scopedSlots={{
        control: () => [component],
      }}
    />
  )
}
