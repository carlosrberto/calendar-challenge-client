import babel from 'rollup-plugin-babel';

export default {
  input: 'src/index.js',
  output: {
    name: 'events',
    file: 'lib/index.js',
    format: 'umd',
  },
  plugins: [
    babel(),
  ],
};
