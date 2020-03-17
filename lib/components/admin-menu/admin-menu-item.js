import Vue from 'vue'
import startsWith from 'lodash/startsWith'
import { ADD_TO_BREADCRUMBS } from '../../store/admin'

export default Vue.extend({
  name: 'AdminMenuItem',
  props: {
    id: {
      type: String,
      required: true,
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
  render() {
    let subTitle
    if (this.subTitle !== '') {
      subTitle = <q-item-label caption={true}>{this.subTitle}</q-item-label>
    }

    const iconArrow =
      this.type === 'section' ? (
        <q-item-section side={true}>
          <q-icon name="keyboard_arrow_right" />
        </q-item-section>
      ) : undefined

    return (
      <q-item clickable={true} on-click={this.menuItemClick}>
        <q-item-section avatar={true}>
          <q-avatar icon={this.icon} color="grey-7" text-color="white" />
        </q-item-section>
        <q-item-section>
          <q-item-label lines={1}>{this.title}</q-item-label>
          {subTitle}
        </q-item-section>
        {iconArrow}
      </q-item>
    )
  },
})
