import * as path from 'path'
import * as fs from 'fs'
import Ajv from 'ajv'
import adminConfigSchema from './../schema/admin.config.schema.json'

/**
 * Load admin.config.json from src directory
 *
 * @param {string} rootPath path to src directory
 * @returns {Promise<object>} config object
 */
export async function loadConfigFile(rootPath) {
  const adminConfigFile = path.resolve(rootPath, 'admin.config.json')
  if (fs.existsSync(adminConfigFile)) {
    const data = await require(`${adminConfigFile}`)
    return JSON.parse(JSON.stringify(data))
  }
  console.warn(`Admin config file not found in ${adminConfigFile}`)
  return {}
}

/**
 * Validate Admin Config
 *
 * @exports
 * @param {object} [data={}] config data
 */
export function validateConfig(data = {}) {
  const ajv = new Ajv()
  const validate = ajv.compile(adminConfigSchema)
  const valid = validate(data)
  if (!valid) {
    const message = ['Schema Config Validation Error']
    validate.errors.forEach((error) => {
      message.push(`data: ${error.dataPath}`)
      message.push(`schema: ${error.schemaPath}`)
      message.push(`message: ${error.message}`)
    })
    throw new Error(message.join(`\n`))
  }
}
