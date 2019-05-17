import * as path from 'path'

const defaultOptions = {
  width: '300px',
  menuItems: [],
}

export default function module(moduleOptions) {
  const options = Object.assign({}, defaultOptions, moduleOptions)

  this.options.css.push('dist/admin.css')

  this.addTemplate({
    src: path.resolve(__dirname, 'store/admin.js'),
    fileName: path.join('nuxt-admin/store', 'admin.js'),
  })

  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
    fileName: path.join('nuxt-admin', 'plugin.admin.js'),
    options,
  })
}

export const meta = require('./../package.json')
