const { FuseBox } = require('fuse-box');

const fuseBox = FuseBox.init({
  homeDir: "src/",
  sourceMap: {
    bundleReference: "./chess.js.map",
    outFile: "./dist/chess.js.map",
  },
  outFile: "./dist/chess.js"
})

fuseBox.devServer(">index.ts");