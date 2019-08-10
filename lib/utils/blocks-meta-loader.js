const blocksMeta = {}

/**
 * Loading blocks meta info
 *
 * @exports
 * @param {string[]} [files=[]] block files
 * @returns {object} array objects with meta information
 */
export async function loadBlocksMetaInfo(files = []) {
  if (Object.keys(blocksMeta).length === 2) {
    return blocksMeta
  }
  blocksMeta.private = new Set() // privatie (admins only) information
  blocksMeta.public = new Set() // public information, e.g. file name and component name
  for (const file of files) {
    const block = await import(`~/components/blocks/${file}`)
    if (typeof block === 'object') {
      const blockMeta = Object.assign({}, block.meta, { file, name: block.default.name })
      blocksMeta.private.add(blockMeta)
      blocksMeta.public.add({ file, name: block.default.name })
    } else {
      console.warn(`Error loading a block component from ${file}`)
    }
  }
  return blocksMeta
}
