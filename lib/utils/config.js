import * as path from 'path'

/**
 * Load admin.config.json from src directory
 *
 * @param {string} rootPath path to src directory
 * @returns {Promise<object>} config object
 */
export async function loadConfigFile(rootPath) {
  const adminConfigFile = path.resolve(rootPath, 'admin.config.json')
  try {
    return await import(`${adminConfigFile}`)
  } catch {
    throw new Error(`Nuxt Admin Module: admin.config.json in ${rootPath} not found!`)
  }
}
