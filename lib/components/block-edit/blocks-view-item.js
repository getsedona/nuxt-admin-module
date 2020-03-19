import Vue from 'vue'
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
    removeClick() {
      this.showRemoveConfirm = true
    },
    __changeParams(params) {
      this.$emit('change-params', params)
    },
  },
  render() {
    /// Block item confirm

    const removeConfirm = (
      <div class={['fit', 'row', 'q-gutter-x-sm', 'justify-center']}>
        <q-btn label="Cancel" dense={false} outline={true} on-click={this.removeCancelClick} />
        <q-btn label="Remove" dense={false} color="negative" on-click={this.removeOkClick} />
      </div>
    )

    /// Block item

    const headerItemIcon = (
      <q-item-section avatar={true}>
        <q-avatar icon={this.meta?.icon || 'extension'} textColor="white" />
      </q-item-section>
    )

    // Block item title with sub title

    const headerItemTitle = (
      <q-item-section>
        <q-item-label>{this.meta?.title || this.component}</q-item-label>
        {this.meta.description ? (
          <q-item-label caption={true} lines={2}>
            {this.meta.description}
          </q-item-label>
        ) : (
          undefined
        )}
      </q-item-section>
    )

    // Block item context menu

    const headerItemMenu = (
      <q-item-section side={true}>
        <q-btn round={true} flat={true} dense={true} icon="more_vert" on-click={(event) => event.stopPropagation()}>
          <q-menu auto-close={true}>
            <q-list bordered={false}>
              <q-item clickable={true}>
                <q-item-section>Copy</q-item-section>
              </q-item>
              <q-item clickable={true} on-click={this.removeClick}>
                <q-item-section>
                  <q-item-label lines={1}>Remove Block</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-item-section>
    )

    return (
      <q-expansion-item
        icon={this.meta?.icon || 'extension'}
        class={['admin-block-item', 'bg-grey-7', 'text-white']}
        denseToggle={false}
        defaultOpened={false}
        group="blocks"
        scopedSlots={{
          header: () => [
            ...(this.showRemoveConfirm ? [removeConfirm] : [headerItemIcon, headerItemTitle, headerItemMenu]),
          ],
        }}
      >
        <blocks-view-item-form
          component={this.component}
          form={this.props}
          on-change={(params) => this.__changeParams(params)}
        />
      </q-expansion-item>
    )
  },
})
