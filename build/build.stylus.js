const path = require("path");
const fs = require("fs");
const stylus = require("stylus");
const zlib = require("zlib");
const postcss = require("postcss");
const autoprefixer = require("autoprefixer");
const csscomb = require("postcss-csscomb");
const csso = require("postcss-csso");

const pathList = [path.resolve(__dirname, "../lib/assets/css")];
const styleIndex = path.resolve(__dirname, "../lib/assets/css/index.styl");
const styleDist = path.resolve(__dirname, "../dist/admin.min.css");

generateFiles().then(code => {
  fs.writeFile(styleDist, code, err => {
    zlib.gzip(code, (err, zipped) => {
      if (err) return reject(err);
      return zipped;
    });
  });
});

function generateFiles() {
  const code = fs.readFileSync(styleIndex).toString("utf-8");
  return compileStylus(code)
    .then(code =>
      postcss([autoprefixer({ browsers: ["last 2 versions", "ie >= 11"] }), csscomb(), csso()]).process(code, {
        from: void 0
      })
    )
    .then(code => {
      code.warnings().forEach(warn => {
        console.warn(warn.toString());
      });
      return code.css;
    });
}

function compileStylus(code) {
  return new Promise((resolve, reject) => {
    stylus(code)
      .set("paths", pathList)
      .set("prefix", "admin-panel .")
      .render((err, code) => {
        if (err) {
          console.log();
          reject(err);
        } else {
          resolve(code);
        }
      });
  });
}
