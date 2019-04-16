import Vue from 'vue'

export default async function({ app }) {
  app.head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css?family=Material+Icons',
  })

  const Quasar = await import('quasar')
  Vue.use(Quasar.default, {
    framework: {
      components: ['QBtn', 'QIcon'],
    },
  })
}
