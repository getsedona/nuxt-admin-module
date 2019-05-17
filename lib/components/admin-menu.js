import Vue from 'vue'
import { mapState } from 'vuex'
import get from 'lodash/get'
import groupBy from 'lodash/groupBy'
import upperFirst from 'lodash/upperFirst'

export default Vue.extend({
  name: 'AdminMenu',
  computed: {
    ...mapState({
      items: (state) => state.admin.menuItems,
    }),
  },
  render(h) {
    const childComponents = []
    const menuItems = groupBy(this.items, 'section')
    Object.keys(menuItems).forEach((sectionName) => {
      childComponents.push(h('q-item-label', { props: { header: true } }, upperFirst(sectionName)))
      menuItems[sectionName].forEach((menuItem) => {
        let subTitle = null
        const subTitleText = get(menuItem, 'subtitle', null)
        if (subTitleText !== null) {
          subTitle = h('q-item-label', { props: { caption: true } }, subTitleText)
        }
        childComponents.push(
          h('q-item', { props: { clickable: true }, directives: [{ name: 'ripple' }] }, [
            h('q-item-section', { props: { avatar: true } }, [
              h('q-avatar', {
                props: { icon: get(menuItem, 'icon', 'folder'), color: 'grey-7', 'text-color': 'white' },
              }),
            ]),
            h('q-item-section', null, [
              h('q-item-label', { props: { lines: 1 } }, get(menuItem, 'title', '<NO TITLE>')),
              ...(subTitle !== null ? [subTitle] : []),
            ]),
          ])
        )
      })
    })

    return h(
      'q-list',
      {
        props: { padding: true, dark: true },
        class: 'full-width',
      },
      childComponents
    )
  },
})
