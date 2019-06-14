import VuePlugin from 'quasar/src/vue-plugin.js'

import { QToolbar, QToolbarTitle } from 'quasar/src/components/toolbar'
import { QBtn } from 'quasar/src/components/btn'
import { QIcon } from 'quasar/src/components/icon'
import { QTabPanel, QTabPanels } from 'quasar/src/components/tab-panels'
import { QList, QItem, QItemSection, QItemLabel } from 'quasar/src/components/list'
import { QAvatar } from 'quasar/src/components/avatar'
import { QSeparator } from 'quasar/src/components/separator'

import * as directives from 'quasar/src/directives.js'
import { Dialog, Notify } from 'quasar/src/plugins.js'

export default {
  ...VuePlugin,
  install(Vue) {
    VuePlugin.install(Vue, {
      components: {
        QToolbar,
        QToolbarTitle,
        QBtn,
        QIcon,
        QTabPanel,
        QTabPanels,
        QList,
        QItem,
        QItemSection,
        QItemLabel,
        QAvatar,
        QSeparator,
      },
      directives,
      plugins: {
        Dialog,
        Notify,
      },
    })
  },
}
