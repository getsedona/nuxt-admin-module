import * as babel from '@babel/parser'
import traverse from '@babel/traverse'
import get from 'lodash/get'

/**
 *
 *
 * @exports
 * @param {string} code javascript code
 * @returns {object} block meta
 */
export function parseComponent(code) {
  const result = {
    name: '',
    props: {},
  }
  const ast = babel.parse(code, { sourceType: 'module' })
  traverse(ast, {
    ObjectProperty({ node }) {
      switch (node.key.name) {
        case 'name':
          result.name = node.value.value
          break
        case 'props':
          result.props = parseProps(node.value.properties)
          break
      }
    },
  })
  return result
}

/**
 * Parse property object
 *
 * @param {any[]} [props=[]] asd
 * @returns {object} block properties
 */
function parseProps(props = []) {
  const result = {}
  for (const prop of props) {
    result[prop.key.name] = {}
    if (prop.value.name === undefined && Array.isArray(prop.value.properties)) {
      result[prop.key.name] = parsePropObject(prop.value.properties)
    } else if (typeof prop.value.name === 'string') {
      result[prop.key.name] = getPropDefaults(parsePropType(prop.value))
    }
  }
  return result
}

/**
 *
 *
 * @param {any[]} [props=[]] properties
 * @returns {any} block meta properties
 */
function parsePropObject(props = []) {
  const result = {}
  for (const prop of props) {
    switch (prop.key.name) {
      case 'type':
        result.type = parsePropType(prop.value)
        break
      case 'default':
        result.default = get(prop.value, 'value', '')
        break
      case 'required':
        result.default = get(prop.value, 'value', false)
        break
    }
  }
  return result
}

/**
 *
 *
 * @param {object} node asd
 * @returns {string} block property type
 */
function parsePropType(node) {
  const value = get(node, 'name', '')
  switch (value) {
    case 'String':
      return 'text'
    case 'Number':
      return 'number'
    case 'Boolean':
      return 'checkbox'
    case 'Array':
      return 'textarea'
    case 'Object':
      return 'textarea'
    case 'Date':
      return 'date'
    default:
      return 'text'
  }
}

/**
 * Return defaults if prop meta not exists
 * Example: prop `isDark: Boolean`, return { type: 'checkbox': default: false }
 *
 * @param {string} type block prop type
 * @returns {object} block prop default
 */
function getPropDefaults(type) {
  switch (type) {
    case 'text':
      return {
        type: 'text',
        default: '',
      }
    case 'number':
      return {
        type: 'number',
        default: 0,
      }
    case 'checkbox':
      return {
        type: 'checkbox',
        default: false,
      }
    case 'textarea':
      return {
        type: 'textarea',
        default: '',
      }
    case 'date':
      return {
        type: 'date',
        default: new Date(),
      }
  }
}
