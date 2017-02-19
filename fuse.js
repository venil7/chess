const fsbx = require('fuse-box');
const [, , action = ''] = process.argv;

const fuseBox = fsbx.FuseBox.init({
  homeDir: 'src/',
  sourceMap: {
    bundleReference: './index.js.map',
    outFile: './build/index.js.map',
  },
  outFile: './build/index.js',
  plugins: [
    fsbx.CSSPlugin(),
  ]
});

switch (action) {
  case 'bundle': return fuseBox.bundle('>index.ts');
  case 'devserver': return fuseBox.devServer('>web/index.tsx');
  default: console.log('provide action');
}