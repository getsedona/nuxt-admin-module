import * as path from 'path'

const defaultOptions = {
  width: '300px',
}

export default function module(moduleOptions) {
  const options = Object.assign({}, defaultOptions, moduleOptions)

  this.options.css.push('dist/admin.css')

  this.addPlugin({
    // eslint-disable-next-line unicorn/prevent-abbreviations
    src: path.resolve(__dirname, 'plugin.js'),
    options,
  })
}

export const meta = require('./../package.json')
