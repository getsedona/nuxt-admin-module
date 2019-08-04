import Vue from 'vue'
import startsWith from 'lodash/startsWith'
import { ADD_TO_BREADCRUMBS } from '../../store/admin'

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
      default: '<NO TITLE>',
    },
    subTitle: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: 'folder',
    },
    component: {
      type: String,
      default: '',
      validator: (value) => !startsWith(value, '~') && !startsWith(value, '@') && !startsWith(value, '/'),
    },
    items: {
      type: Array,
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
    menuItemClick() {
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
      this.$admin.$emit('admin:view-change', data)
      this.$store.commit(`admin/${ADD_TO_BREADCRUMBS}`, { id: data.id, title: data.title })
    },
  },
  render(h) {
    let subTitle
    if (this.subTitle !== '') {
      subTitle = h('q-item-label', { props: { caption: true } }, this.subTitle)
    }

    return h('q-item', { props: { clickable: true }, on: { click: this.menuItemClick } }, [
      h('q-item-section', { props: { avatar: true } }, [
        h('q-avatar', {
          props: { icon: this.icon, color: 'grey-7', 'text-color': 'white' },
        }),
      ]),
      h('q-item-section', [
        h('q-item-label', { props: { lines: 1 } }, this.title),
        ...(subTitle !== undefined ? [subTitle] : []),
      ]),
      ...(this.type === 'section'
        ? [h('q-item-section', { props: { side: true } }, [h('q-icon', { props: { name: 'keyboard_arrow_right' } })])]
        : []),
    ])
  },
})
