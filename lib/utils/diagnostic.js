import * as fs from 'fs'
import * as path from 'path'

/**
 * Checking for exists blocks directory and if does not exists will create it
 *
 * @exports
 * @param {string} srcDir nuxt source dirrectory
 */
export function checkBlocksDirectory(srcDir) {
  const blocksPath = path.resolve(srcDir, 'components', 'blocks')
  if (!fs.existsSync(blocksPath)) {
    fs.mkdirSync(blocksPath)
    console.info(`Created blocks dirrectory in ${blocksPath}`)
  }
}
