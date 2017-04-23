import typescriptPlugin from 'rollup-plugin-typescript';
import typescript from 'typescript';

export default {
  entry: './src/index.ts',
  plugins: [typescriptPlugin({ typescript })],
  format: 'cjs',
  dest: './build/index.js',
  sourceMap: true
};