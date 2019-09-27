import * as fs from 'fs'
import * as path from 'path'
import * as compiler from '@vue/component-compiler-utils'
import * as templateCompiler from 'vue-template-compiler'
import get from 'lodash/get'
import { parseComponent } from './component-parser'

const blocks = []

export class BlocksMetaLoader {
  constructor(blocksDir) {
    this.blocksDir = blocksDir
  }

  /**
   * Load blocks meta
   *
   * @returns {any[]} array of blocks meta
   *
   * @memberof BlocksMetaLoader
   */
  load() {
    if (blocks.length > 0) return blocks
    const blockFiles = fs.readdirSync(this.blocksDir)
    blockFiles.forEach((blockFile) => {
      const blockFilePath = path.resolve(this.blocksDir, blockFile)
      const stat = fs.lstatSync(blockFilePath)

      // load block component from directory
      if (stat.isDirectory(blockFilePath)) {
        blocks.push(...this._loadDirectory(blockFilePath))
      }

      // load block component from file
      if (stat.isFile(blockFilePath)) {
        const fileExt = path.extname(blockFilePath)
        if (fileExt === '.js' || fileExt === '.vue') {
          blocks.push(this._loadMetaFromFile(blockFilePath, fileExt))
        }
      }
    })
    return blocks
  }

  /**
   * Load blocks meta with `file` and `name` fields
   * This fields required for render content
   *
   * @returns {any[]} block meta objects
   * @memberof BlocksMetaLoader
   */
  loadPublic() {
    return blocks.map((item) => {
      return {
        file: item.file,
        name: item.name,
      }
    })
  }

  /**
   * Load block meta from one directory
   *
   * @param {string} blockPath block path
   *
   * @returns {any[]} array of blocks meta
   * @memberof BlocksMetaLoader
   */
  _loadDirectory(blockPath) {
    return []
  }

  /**
   * Load block meta from component file
   *
   * @param {string} blockPath block path
   * @param {string} ext block file extension
   *
   * @returns {object} block meta
   * @memberof BlocksMetaLoader
   */
  _loadMetaFromFile(blockPath, ext) {
    let blockMeta = {
      file: blockPath
        .replace(this.blocksDir, '')
        // .replace(/\.js$|\.vue$/, '')
        .replace(/^\//, '')
        .trim(),
    }
    if (ext === '.js') {
      blockMeta = Object.assign(blockMeta, this._loadMetaFromJsFile(blockPath))
    }
    if (ext === '.vue') {
      const meta = this._loadMetaFromVueFile(blockPath)
      blockMeta = Object.assign(blockMeta, meta)
    }
    return blockMeta
  }

  /**
   * Get block meta info from external json file
   *
   * @param {string} blockPath block path
   *
   * @returns {any} block meta object
   * @memberof BlocksMetaLoader
   */
  _loadMetaFromJsFile(blockPath) {
    const code = fs.readFileSync(blockPath).toString('utf-8')
    const result = parseComponent(code)

    const fileExt = path.extname(blockPath)
    const metaFilePath = path.replace(fileExt, '.json')
    if (!fs.existsSync(metaFilePath)) {
      return result
    }
    const meta = fs.readFileSync(metaFilePath).toString('utf-8')
    return Object.assign(result, JSON.parse(meta))
  }

  /**
   * Get custom section `block` from vue file
   *
   * @param {string} blockPath block path
   *
   * @returns {any} block meta object
   * @memberof BlocksMetaLoader
   */
  _loadMetaFromVueFile(blockPath) {
    const content = fs.readFileSync(blockPath).toString('utf-8')
    try {
      const component = compiler.parse({
        source: content,
        compiler: templateCompiler,
        needMap: false,
      })
      const metaFromComponent = this._parseComponent(get(component, ['script', 'content'], ''))
      const block = component.customBlocks.find((item) => item.type === 'block')
      if (block === undefined) {
        return metaFromComponent
      }
      const meta = JSON.parse(block.content.trim())
      return Object.assign(metaFromComponent, meta)
    } catch (error) {
      console.warn(`Error parsing block component in ${blockPath}`, error)
    }
  }

  /**
   *
   *
   * @param {string} code component code
   * @returns {object} block meta from compoennt
   * @memberof BlocksMetaLoader
   */
  _parseComponent(code) {
    try {
      return parseComponent(code)
    } catch (error) {
      console.warn(`Error parsing component. Code ${code}`, error)
      return {}
    }
  }
}
