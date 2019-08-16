import Vue from 'vue'
import get from 'lodash/get'
import BlocksViewItemForm from './blocks-view-item-form'

export default Vue.extend({
  name: 'BlocksViewItem',
  components: {
    BlocksViewItemForm,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    component: {
      type: String,
      required: true,
    },
    props: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      showRemoveButton: false,
      showRemoveConfirm: false,
    }
  },
  computed: {
    meta() {
      return this.$store.getters['admin/blocks/getMetaByComponent'](this.component)
    },
  },
  methods: {
    removeCancelClick(event) {
      event.stopPropagation()
      this.showRemoveConfirm = false
    },
    removeOkClick(event) {
      event.stopPropagation()
      this.$emit('remove', { id: this.id })
    },
    removeClick(event) {
      event.stopPropagation()
      this.showRemoveButton = false
      this.showRemoveConfirm = true
    },
    __changeParams(params) {
      this.$emit('change-params', params)
    },
  },
  render(h) {
    const removeConfirm = [
      h('div', { class: ['fit', 'row', 'q-gutter-sm', 'justify-center'] }, [
        h('q-btn', {
          props: { label: 'Cancel', outline: true },
          on: {
            click: this.removeCancelClick,
          },
        }),
        h('q-btn', { props: { label: 'Remove', color: 'negative' }, on: { click: this.removeOkClick } }),
      ]),
    ]

    const removeButton = h(
      'q-btn',
      {
        props: { flat: true, round: true },
        class: !this.showRemoveButton ? 'hidden' : '',
        on: {
          click: this.removeClick,
        },
      },
      [h('q-icon', { props: { name: 'delete' } })]
    )

    const headerItem = [
      ...(!this.showRemoveConfirm
        ? [
          h('q-item-section', { props: { avatar: true } }, [
            h('q-avatar', {
              props: { icon: get(this.meta, 'icon', 'extension'), textColor: 'white' },
            }),
          ]),
        ]
        : []),
      ...(!this.showRemoveConfirm ? [h('q-item-section', get(this.meta, 'title', this.component))] : removeConfirm),
      removeButton,
    ]

    return h(
      'q-expansion-item',
      {
        props: {
          icon: get(this.meta, 'icon', 'extension'),
          label: get(this.meta, 'title', this.component),
          ...(this.meta.description ? { caption: this.meta.description } : {}),
          denseToggle: true,
          defaultOpened: false,
          group: 'blocks',
        },
        class: ['admin-block-item', 'bg-grey-7', 'text-white'],
        scopedSlots: {
          header: () => headerItem,
        },
        nativeOn: {
          mouseover: () => {
            if (!this.showRemoveConfirm) {
              this.showRemoveButton = true
            }
          },
          mouseleave: () => {
            this.showRemoveButton = false
          },
        },
      },
      [
        h('blocks-view-item-form', {
          props: { component: this.component, form: this.props },
          on: {
            change: (params) => {
              this.__changeParams(params)
            },
          },
        }),
      ]
    )
  },
})
