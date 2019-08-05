import Vue from 'vue'
import { generateId } from './utils/nanoid'

export default new Vue({
  name: 'Admin',
  methods: {
    normalizeMenuItem(item) {},
    goHome() {
      this.$emit('admin:view-change', 'tab-home')
    },
    goTo({ id, component, title = '', subTitile = '', icon = 'folder', type = 'item', items = [] }, params) {
      if (component === undefined && type !== 'section') {
        throw new Error('Component should be provided')
      }
      const item = { component, title, subTitile, icon, type, items }
      item.id = id || generateId()
      item.items.map((item) => {
        item.id = item.id === undefined ? generateId() : item.id
        item.type = item.type === undefined && item.component === undefined ? 'section' : 'item'
        item.icon = item.icon || 'folder'
        if (item.type === 'section' && !Array.isArray(item.items)) {
          item.items = []
        }
        return item
      })
      this.$emit('admin:view-change', item, params)
    },
  },
})
