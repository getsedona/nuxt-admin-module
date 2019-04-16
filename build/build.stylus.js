const path = require('path')
const fs = require('fs')
const stylus = require('stylus')

const pathList = [path.resolve(__dirname, '../lib/assets/css')]
const styleIndex = path.resolve(__dirname, '../lib/assets/css/index.styl')
const styleDist = path.resolve(__dirname, '../dist/admin.css')

generateFiles().then((code) => {
  fs.writeFileSync(styleDist, code)
})

function generateFiles() {
  const code = fs.readFileSync(styleIndex).toString('utf-8')
  return compileStylus(code)
}

function compileStylus(code) {
  return new Promise((resolve, reject) => {
    stylus(code)
      .set('paths', pathList)
      .set('prefix', 'admin-panel .')
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
