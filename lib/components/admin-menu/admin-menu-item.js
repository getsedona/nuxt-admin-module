import Vue from 'vue'
import startsWith from 'lodash/startsWith'
import { ADD_TO_BREADCRUMBS } from './../../store/admin'

export default Vue.extend({
  name: 'AdminMenuItem',
  props: {
    id: {
      type: String,
      required: true,
      default: '',
    },
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
      type: String,
      required: false,
      default: '',
      validator: (value) => !startsWith(value, '~') && !startsWith(value, '@') && !startsWith(value, '/'),
    },
    items: {
      type: Array,
      required: false,
      default: () => [],
    },
    type: {
      type: String,
      required: true,
      default: 'item',
      validator: (value) => ['item', 'section'].includes(value),
    },
  },
  methods: {
    onMenuItemClick() {
      const data = {
        id: this.id,
        title: this.title,
        subTitle: this.subTitle,
        icon: this.icon,
        type: this.type,
      }
      if (this.type === 'item') {
        data.component = this.component
      } else {
        data.items = this.items
      }
      this.$root.$emit('admin:menu-item-click', data)
      this.$store.commit(`admin/${ADD_TO_BREADCRUMBS}`, data)
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
        ...(this.type === 'section'
          ? [h('q-item-section', { props: { side: true } }, [h('q-icon', { props: { name: 'keyboard_arrow_right' } })])]
          : []),
      ]
    )
  },
})
