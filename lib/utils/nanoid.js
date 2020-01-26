import nanoid from 'nanoid/generate'

/**
 * Generate unique identifier
 *
 * @exports
 * @returns {string} short unique id
 */
export function generateId() {
  const alphabet = '0123456789abcdefghijklmnopqrstuvwxyz'
  return nanoid(alphabet, 10)
}

/**
 * Set ID field for each item
 *
 * @exports
 * @param {import('../../types').MenuItem[]} [items=[]] items
 * @returns {import('../../types').MenuItem[]} items with unique id
 */
export function setIdToMenuItems(items = []) {
  return items.map((item) => {
    if (item.id === undefined) {
      item.id = generateId()
    }
    if (Array.isArray(item.items)) {
      item.items = setIdToMenuItems(item.items)
    }
    return item
  })
}
