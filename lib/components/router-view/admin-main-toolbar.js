import Vue from 'vue'
import { generateId } from '../../utils/nanoid'

export default Vue.extend({
  name: 'AdminMainToolbar',
  computed: {
    settings() {
      return this.$store.getters['admin/config/toolBarSettngs']()
    },
  },
  methods: {
    buttonClick({ id, title, component, icon = 'folder' }) {
      this.$admin.goTo({ id, title, icon, component })
    },
  },
  render() {
    const buttons = new Set()

    if (this.settings.showHome) {
      buttons.add(
        <q-btn flat={true} round={true} dense={true} class="q-mr-sm" on-click={this.$admin.goHome}>
          <q-icon name="home" />
          <q-tooltip content-class="bg-amber text-black shadow-4">Home</q-tooltip>
        </q-btn>
      )
    }

    this.settings.buttons.forEach((button) => {
      const title = button?.title || false
      const icon = button?.icon || 'extension'
      const id = generateId()

      buttons.add(
        <q-btn
          flat={true}
          round={true}
          dense={true}
          class="q-mr-sm"
          on-click={() => this.buttonClick({ id, ...button })}
        >
          <q-icon name={icon} />
          {title ? <q-tooltip>{button.title}</q-tooltip> : ''}
        </q-btn>
      )
    })

    if (this.settings.title !== '') {
      buttons.add(<q-toolbar-title>{this.settings.title}</q-toolbar-title>)
    }

    if (this.settings.showHide) {
      buttons.add(
        <q-btn flat={true} round={true} dense={true} class="q-mr-sm" on-click={this.$admin.goHome}>
          <q-icon name="menu" />
          <q-tooltip>Hide panel</q-tooltip>
        </q-btn>
      )
    }

    return <q-toolbar class="bg-grey-7">{...buttons}</q-toolbar>
  },
})
