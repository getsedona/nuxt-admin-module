import Vue from 'vue'

const leftButtons = [{ icon: 'home' }]
const rightButtons = [{ icon: 'menu' }]

export default Vue.extend({
  name: 'AdminMainToolbar',
  methods: {
    goHome() {
      this.$root.$emit('admin:menu-item-change', {
        tab: 'tab-home',
      })
    },
  },
  render(h) {
    const buttons = []
    leftButtons.forEach((button) => {
      buttons.push(
        h('q-btn', { props: { flat: true, round: true, dense: true }, on: { click: this.goHome } }, [
          h('q-icon', { props: { name: button.icon } }),
        ])
      )
    })
    buttons.push(h('q-toolbar-title', 'Admin'))
    rightButtons.forEach((button) => {
      buttons.push(
        h('q-btn', { props: { flat: true, round: true, dense: true } }, [h('q-icon', { props: { name: button.icon } })])
      )
    })

    return h('q-toolbar', { class: 'bg-grey-7' }, buttons)
  },
})
