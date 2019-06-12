import nanoid from 'nanoid/generate'

/**
 * Generate unique identifier
 *
 * @export
 * @returns {string}
 */
export function generateId() {
  const alphabet = '0123456789abcdefghijklmnopqrstuvwxyz'
  return nanoid(alphabet, 10)
}

/**
 * Set ID field for each item
 *
 * @export
 * @param {*} [items=[]]
 * @returns {[]}
 */
export function setIdToMenuItems(items = []) {
  return items.map((item) => {
    item.id = generateId()
    if (Array.isArray(item.items)) {
      item.items = setIdToMenuItems(item.items)
    }
    return item
  })
}
