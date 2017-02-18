const { FuseBox } = require('fuse-box');
const [, , action = ''] = process.argv;

const fuseBox = FuseBox.init({
  homeDir: 'src/',
  sourceMap: {
    bundleReference: './index.js.map',
    outFile: './lib/index.js.map',
  },
  outFile: './lib/index.js'
});

switch (action) {
  case 'bundle': return fuseBox.bundle('>index.ts');
  case 'devserver': return fuseBox.devServer('>web/index.ts');
  default: console.log('provide action');
}