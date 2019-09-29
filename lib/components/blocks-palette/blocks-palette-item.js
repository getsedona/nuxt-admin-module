import Vue from 'vue'
import startCase from 'lodash/startCase'

export default Vue.extend({
  name: 'BlockspaletteItem',
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
  render(h) {
    let subTitle
    if (this.description !== '') {
      subTitle = h('q-item-label', { props: { caption: true } }, this.description)
    }
    let title = this.title
    if (title === '') {
      title = startCase(this.name)
    }

    return h('q-item', { props: { clickable: true }, on: { click: () => this.$emit('click', { name: this.name }) } }, [
      h('q-item-section', { props: { avatar: true } }, [
        h('q-avatar', {
          props: { icon: this.icon, color: 'grey-7', 'text-color': 'white' },
        }),
      ]),
      h('q-item-section', [h('q-item-label', title), ...(subTitle !== undefined ? [subTitle] : [])]),
    ])
  },
})
