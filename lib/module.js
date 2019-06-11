import * as path from 'path'
import isEmpty from 'lodash/isEmpty'
import { loadConfigFile } from './utils/config'

const defaultOptions = {
  width: '300px',
  menuItems: [],
}

/**
 * Load Module
 *
 * @export
 * @param {object} moduleOptions
 */
export default async function module(moduleOptions = {}) {
  let options = {}
  if (isEmpty(moduleOptions)) {
    options = await loadConfigFile(this.options.rootDir)
    options = Object.assign({}, defaultOptions, options)
  } else {
    options = Object.assign({}, defaultOptions, moduleOptions)
  }

  this.options.css.push('dist/admin.css')

  this.addTemplate({
    src: path.resolve(__dirname, 'store/admin.js'),
    fileName: path.join('nuxt-admin/store', 'admin.js'),
  })

  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.template.js'),
    fileName: path.join('nuxt-admin', 'plugin.admin.js'),
    options,
  })
}

export const meta = require('./../package.json')
