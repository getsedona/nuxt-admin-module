import * as path from "path";

const defaultOptions = {
  width: "300px"
};

export default async function module(moduleOptions) {
  const options = Object.assign({}, defaultOptions, moduleOptions);

  this.options.css.push('dist/admin.min.css')

  this.addPlugin({
    src: path.resolve(__dirname, "plugin.js"),
    options
  });
}

export const meta = require("./../package.json");