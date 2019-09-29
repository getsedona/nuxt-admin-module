import Vue from 'vue'
import startCase from 'lodash/startCase'

export default Vue.extend({
  name: 'BlockspaletteItem',
  functional: true,
  props: {
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: 'extension',
    },
    name: {
      type: String,
      required: true,
    },
  },
  render(h, { props, listeners }) {
    let subTitle
    if (props.description !== '') {
      subTitle = h('q-item-label', { props: { caption: true } }, props.description)
    }
    let title = props.title
    if (title === '') {
      title = startCase(props.name)
    }

    return h('q-item', { props: { clickable: true }, on: { click: () => listeners.click({ name: props.name }) } }, [
      h('q-item-section', { props: { avatar: true } }, [
        h('q-avatar', {
          props: { icon: props.icon, color: 'grey-7', 'text-color': 'white' },
        }),
      ]),
      h('q-item-section', [h('q-item-label', title), ...(subTitle !== undefined ? [subTitle] : [])]),
    ])
  },
})
