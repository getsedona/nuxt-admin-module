import * as path from 'path'
import isEmpty from 'lodash/isEmpty'
import { loadConfigFile, validateConfig } from './utils/config'
import { setIdToMenuItems } from './utils/nanoid'
import { checkBlocksDirectory } from './utils/diagnostic'
import { BlocksMetaLoader } from './utils/blocks/blocks-meta-loader'

const defaultOptions = {
  items: [],
  blockFiles: [], // block names without extensions
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

  /// Get config object from nuxt.config.js or admin.config.json

  let options
  if (isEmpty(moduleOptions)) {
    options = await loadConfigFile(this.options.rootDir)
    options = Object.assign({}, defaultOptions, options)
  } else {
    options = Object.assign({}, defaultOptions, moduleOptions)
  }

  /// Validate config with json schema

  validateConfig(options)

  /// Diagnostic checks

  checkBlocksDirectory(this.options.srcDir)

  /// Get block names and save their in an options

  console.time('loading blocks')
  const blocksDir = path.resolve(this.options.srcDir, 'components/blocks')
  const blocksMetaLoader = new BlocksMetaLoader(blocksDir)
  const blocks = blocksMetaLoader.load()
  console.timeEnd('loading blocks')

  /// Set unique ids for menu items

  options.items = setIdToMenuItems(options.items)

  // Vuex module

  this.addTemplate({
    src: path.resolve(__dirname, 'store/admin/index.js'),
    fileName: path.join('nuxt-admin/store/admin', 'index.js'),
  })
  this.addTemplate({
    src: path.resolve(__dirname, 'store/admin/blocks.js'),
    fileName: path.join('nuxt-admin/store/admin', 'blocks.js'),
    options: {
      blocks,
    },
  })
  this.addTemplate({
    src: path.resolve(__dirname, 'store/admin/config.js'),
    fileName: path.join('nuxt-admin/store/admin', 'config.js'),
    options,
  })
  this.addTemplate({
    src: path.resolve(__dirname, 'store/blocks.js'),
    fileName: path.join('nuxt-admin/store', 'blocks.js'),
    options: {
      blocks: blocksMetaLoader.loadPublic(),
    },
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
  this.addTemplate({
    src: path.resolve(__dirname, 'utils/admin-loader.js'),
    fileName: path.join('nuxt-admin/utils', 'admin-loader.js'),
  })

  // Plugins

  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.template.js'),
    fileName: path.join('nuxt-admin', 'plugin.admin.js'),
    options,
    // ssr: false,
    // mode: 'client',
  })
}

export const meta = require('./../package.json')
