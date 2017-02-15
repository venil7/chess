const { FuseBox } = require('fuse-box');
const [, , action = ''] = process.argv;

const fuseBox = FuseBox.init({
  homeDir: "src/",
  sourceMap: {
    bundleReference: "./chess.js.map",
    outFile: "./dist/chess.js.map",
  },
  outFile: "./dist/chess.js"
});

switch (action) {
  case 'bundle': {
    return fuseBox.bundle(">index.ts");
  }
  case 'devserver': {
    return fuseBox.devServer(">index.ts");
  }
  default: console.log('provide action');
}