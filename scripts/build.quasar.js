const fs = require('fs')
const path = require('path')
const postcss = require('postcss')
const prefixwrap = require('postcss-prefixwrap')
const remove = require('postcss-remove-rules')
const pkg = require('quasar/package.json')

const sourceFile = path.resolve(__dirname, '../node_modules/quasar/dist/quasar.css')

console.log('Source file:', sourceFile)
console.log('Quasar version:', pkg.version)

function main() {
  fs.readFile(sourceFile, (error, code) => {
    // eslint-disable-next-line promise/catch-or-return,promise/no-promise-in-callback
    postcss([
      prefixwrap('.admin-panel', {
        prefixRootTags: false,
        ignoredSelectors: [
          ':root',
          /\.desktop(.+)/,
          /\.mobile(.+)/,
          /\.cordova(.+)/,
          /\.electron(.+)/,
          /\.ios(.+)/,
          /\.mat(.+)/,
          /\.touch(.+)/,
          /\.within-iframe(.+)/,
          /\.platform-ios(.+)/,
          /\.platform-android(.+)/,
          /\.q-(.+)/,
          /(\.fullscreen|\.absolute-full|\.fixed-full)/,
          /\.no-pointer-events/,
          /(.+)#q-app(.+)/,
        ],
      }),
      remove({
        rulesToRemove: {
          '.admin-panel.body--dark': '*',
          '.admin-panel, .admin-panel': '*',
          '.admin-panel, .admin-panel, .admin-panel #q-app': '*',
          'body.platform-ios.within-iframe, body.platform-ios.within-iframe #q-app': '*',
          'body.electron .q-electron-drag': '*',
          'body.electron .q-electron-drag .q-btn-item, body.electron .q-electron-drag--exception': '*',
        },
      }),
    ])
      .process(code, { from: sourceFile, to: 'dist/quasar.css' })
      .then((result) => {
        const css = result.css.replace(/body\.desktop/g, '.admin-panel')

        fs.writeFile('lib/assets/css/quasar.css', css, () => {
          console.log('Result:', path.resolve(__dirname, '../lib/assets/css/quasar.css'))
          return true
        })
        if (result.map) {
          fs.writeFile('dist/quasar.css.map', result.map, () => true)
        }
      })
  })
}

main()
