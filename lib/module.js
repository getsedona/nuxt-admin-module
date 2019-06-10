import * as path from 'path'
import isEmpty from 'lodash/isEmpty'

const defaultOptions = {
  width: '300px',
  menuItems: [],
}

/**
 * Load admin.config.json from src directory
 *
 * @param {string} rootPath path to src directory
 * @returns {Promise<object>} config object
 */
async function loadConfigFile(rootPath) {
  const adminConfigFile = path.resolve(rootPath, 'admin.config.json')
  try {
    return await import(`${adminConfigFile}`)
  } catch {
    throw new Error(`Nuxt Admin Module: admin.config.json in ${rootPath} not found!`)
  }
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
