const publicMetaInfo = []
const privateMetaInfo = []

/**
 * Load blocks and return extends info with component names and file name
 * Returns array with objects of BlockMeta with additional `component` and `file` fields
 *
 * @exports
 * @param {string[]} [fileNames=[]] block file names
 * @returns {object[]} blocks meta info
 */
export async function getPrivateInfo(fileNames = []) {
  if (privateMetaInfo.length > 0) {
    return privateMetaInfo
  }
  for (const file of fileNames) {
    const block = await import(`~/components/blocks/${file}`)
    if (typeof block === 'object') {
      const blockMeta = Object.assign({}, block.meta, { file, name: block.default.name })
      privateMetaInfo.push(blockMeta)
    } else {
      console.warn(`Error loading a block component from ${file}`)
    }
  }
  return privateMetaInfo
}

/**
 * Load blocks and return info with component names and file name
 *
 * @exports
 * @param {string[]} [fileNames=[]] block file names
 * @returns {{file: string, name: string}[]} public blocks meta info
 */
export async function getPublicInfo(fileNames = []) {
  if (publicMetaInfo.length > 0) {
    return publicMetaInfo
  }
  for (const file of fileNames) {
    const block = await import(`~/components/blocks/${file}`)
    if (typeof block === 'object') {
      publicMetaInfo.push({ file, name: block.default.name })
    } else {
      console.warn(`Error loading a block component from ${file}`)
    }
  }
  return publicMetaInfo
}
