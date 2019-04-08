import * as path from "path";

const defaultOptions = {
  width: "300px"
};

export default async function module(moduleOptions) {
  const options = Object.assign({}, defaultOptions, moduleOptions);

  this.addPlugin({
    src: path.resolve(__dirname, "plugin.js"),
    options
  });
}

export const meta = require("./../package.json");