import Vue from 'vue'

export default Vue.extend({
  name: 'BlockspaletteItem',
  props: {
    title: {
      type: String,
      default: '<NO TITLE>',
    },
    description: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: 'extension',
    },
  },
  render(h) {
    let subTitle
    if (this.description !== '') {
      subTitle = h('q-item-label', { props: { caption: true } }, this.description)
    }

    return h('q-item', { props: { clickable: true } }, [
      h('q-item-section', { props: { avatar: true } }, [
        h('q-avatar', {
          props: { icon: this.icon, color: 'grey-7', 'text-color': 'white' },
        }),
      ]),
      h('q-item-section', [h('q-item-label', this.title), ...(subTitle !== undefined ? [subTitle] : [])]),
    ])
  },
})
