const path = require('path')
const fs = require('fs')
const stylus = require('stylus')
const postcss = require('postcss')
const prefixwrap = require('postcss-prefixwrap')

const pathList = [path.resolve(__dirname, '../lib/assets/css')]
const styleIndex = path.resolve(__dirname, '../lib/assets/css/index.styl')
const styleDist = path.resolve(__dirname, '../dist/admin.css')

generateFiles()
  .then((code) => {
    return fs.writeFileSync(styleDist, code)
  })
  .catch((error) => console.log(error))

/**
 * Compile less with postcss
 *
 * @returns {Promise<string>} compilled css code
 */
function generateFiles() {
  const code = fs.readFileSync(styleIndex).toString('utf-8')
  return compileStylus(code)
    .then((code) =>
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
          ],
        }),
      ]).process(code, {
        from: void 0,
      })
    )
    .then((code) => {
      code.warnings().forEach((warning) => {
        console.warn(warning.toString())
      })
      return code.css
    })
}

/**
 * Compilee less
 *
 * @param {string} code less code
 * @returns {Promise<string>} css code
 */
function compileStylus(code) {
  return new Promise((resolve, reject) => {
    stylus(code)
      .set('paths', pathList)
      .render((error, code) => {
        if (error) {
          console.log(error.message)
          reject(error)
        } else {
          resolve(code)
        }
      })
  })
}
