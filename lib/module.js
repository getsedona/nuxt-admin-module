import * as path from 'path'
import * as fs from 'fs'
import isEmpty from 'lodash/isEmpty'
import { loadConfigFile, validateConfig } from './utils/config'

const defaultOptions = {
  items: [],
}

/**
 * Load Module
 *
 * @exports
 * @param {object} moduleOptions module options
 */
export default async function module(moduleOptions = {}) {
  this.extendBuild((config) => {
    config.node = {
      fs: 'empty',
    }
  })

  let options
  if (isEmpty(moduleOptions)) {
    options = await loadConfigFile(this.options.rootDir)
    options = Object.assign({}, defaultOptions, options)
  } else {
    options = Object.assign({}, defaultOptions, moduleOptions)
  }

  validateConfig(options)

  const blocksDir = path.resolve(this.options.srcDir, 'components/blocks')
  if (!fs.existsSync(blocksDir)) {
    throw new Error(`Blocks directory does not exists in ${blocksDir}`)
  }
  const blocks = fs.readdirSync(blocksDir)
  const blockFiles = []
  blocks.forEach((blockName) => {
    blockFiles.push(blockName.replace(/\.(vue|js)$/gi, ''))
  })
  options.blockFiles = blockFiles

  this.options.css.push('dist/admin.css')

  // Vuex module

  this.addTemplate({
    src: path.resolve(__dirname, 'store/admin.js'),
    fileName: path.join('nuxt-admin/store', 'admin.js'),
  })
  this.addTemplate({
    src: path.resolve(__dirname, 'store/blocks.js'),
    fileName: path.join('nuxt-admin/store', 'blocks.js'),
  })
  this.addTemplate({
    src: path.resolve(__dirname, 'store/blocks-public.js'),
    fileName: path.join('nuxt-admin/store', 'blocks-public.js'),
  })

  // Utils

  this.addTemplate({
    src: path.resolve(__dirname, 'utils/nanoid.js'),
    fileName: path.join('nuxt-admin/utils', 'nanoid.js'),
  })
  this.addTemplate({
    src: path.resolve(__dirname, 'quasar.js'),
    fileName: path.join('nuxt-admin', 'quasar.js'),
  })
  this.addTemplate({
    src: path.resolve(__dirname, 'admin.js'),
    fileName: path.join('nuxt-admin', 'admin.js'),
  })

  // Plugins

  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.template.js'),
    fileName: path.join('nuxt-admin', 'plugin.admin.js'),
    options,
  })
}

export const meta = require('./../package.json')
