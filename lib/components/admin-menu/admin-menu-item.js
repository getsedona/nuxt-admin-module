import Vue from 'vue'

export default Vue.extend({
  name: 'AdminMenuItem',
  props: {
    title: {
      type: String,
      required: false,
      default: '<NO TITLE>',
    },
    subTitle: {
      type: String,
      required: false,
      default: '',
    },
    icon: {
      type: String,
      required: false,
      default: 'folder',
    },
    component: {
      type: [String, Object, Function],
      required: true,
      validator: (value) => value !== '',
    },
    section: {
      type: String,
      required: false,
      default: 'general',
    },
  },
  methods: {
    onMenuItemClick() {
      this.$emit('click', {
        title: this.title,
        subTitle: this.subTitle,
        component: this.component,
      })
    },
  },
  render(h) {
    let subTitle = null
    if (this.subTitle !== '') {
      subTitle = h('q-item-label', { props: { caption: true } }, this.subTitle)
    }

    return h(
      'q-item',
      { props: { clickable: true }, directives: [{ name: 'ripple' }], on: { click: this.onMenuItemClick } },
      [
        h('q-item-section', { props: { avatar: true } }, [
          h('q-avatar', {
            props: { icon: this.icon, color: 'grey-7', 'text-color': 'white' },
          }),
        ]),
        h('q-item-section', null, [
          h('q-item-label', { props: { lines: 1 } }, this.title),
          ...(subTitle !== null ? [subTitle] : []),
        ]),
      ]
    )
  },
})
