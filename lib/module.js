import * as path from 'path'
import * as fs from 'fs'
import isEmpty from 'lodash/isEmpty'
import { loadConfigFile, validateConfig } from './utils/config'
import { setIdToMenuItems } from './utils/nanoid'

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

  options.items = setIdToMenuItems(options.items)

  this.options.css.push('nuxt-admin-module/dist/admin.css')

  this.nuxt.hook('modules:done', (moduleContainer) => {
    // moduleContainer.options.plugins = moduleContainer.options.plugins.reverse()
  })

  // this.nuxt.hook('build:before', (asd, options) => console.log({ context: asd }, { options: options }))

  // Vuex module

  this.addTemplate({
    src: path.resolve(__dirname, 'store/admin/index.js'),
    fileName: path.join('nuxt-admin/store/admin', 'index.js'),
  })
  this.addTemplate({
    src: path.resolve(__dirname, 'store/admin/blocks.js'),
    fileName: path.join('nuxt-admin/store/admin', 'blocks.js'),
    options: options.blockFiles,
  })
  this.addTemplate({
    src: path.resolve(__dirname, 'store/admin/config.js'),
    fileName: path.join('nuxt-admin/store/admin', 'config.js'),
    options,
  })
  this.addTemplate({
    src: path.resolve(__dirname, 'store/blocks.js'),
    fileName: path.join('nuxt-admin/store', 'blocks.js'),
  })

  // Utils

  this.addTemplate({
    src: path.resolve(__dirname, 'utils/nanoid.js'),
    fileName: path.join('nuxt-admin/utils', 'nanoid.js'),
  })
  this.addTemplate({
    src: path.resolve(__dirname, 'utils/blocks-meta-loader.js'),
    fileName: path.join('nuxt-admin/utils', 'blocks-meta-loader.js'),
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
