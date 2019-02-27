import nodeResolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

const input = 'temp/index.js';
const external = id => !id.startsWith('\0') && !id.startsWith('.') && !id.startsWith('/');
const name = 'byteclaw.use-overlay-scroll-position';

const babelCJS = {
  babelrc: false,
  presets: [['@babel/preset-env', { modules: false }], '@babel/preset-react'],
  exclude: /node_modules/,
};

const babelESM = {
  exclude: /node_modules/,
  runtimeHelpers: true,
  presets: [['@babel/preset-env', { modules: false }], '@babel/preset-react'],
};

const commonjsOptions = {
  include: /node_modules/,
};

const globals = {
  react: 'React',
};

export default [
  // cjs dev
  {
    external,
    input,
    output: {
      exports: 'named',
      file: 'dist/use-overlay-scroll-position.cjs.js',
      format: 'cjs',
    },
    plugins: [
      nodeResolve({
        extensions: ['.mjs', '.js', '.jsx'],
      }),
      commonjs({
        ignoreGlobal: true,
      }),
      babel(babelCJS),
      replace({ 'process.env.NODE_ENV': JSON.stringify('development') }),
    ],
  },

  // cjs prod, min
  {
    external,
    input,
    output: {
      exports: 'named',
      file: 'dist/use-overlay-scroll-position.cjs.min.js',
      format: 'cjs',
    },
    plugins: [
      nodeResolve({
        extensions: ['.mjs', '.js', '.jsx'],
      }),
      commonjs(),
      babel(babelCJS),
      replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
      terser({
        sourcemap: true,
      }),
    ],
  },

  // esm
  {
    input,
    external,
    output: {
      file: 'dist/use-overlay-scroll-position.m.js',
      format: 'esm',
    },
    plugins: [
      babel(babelESM),
      nodeResolve({
        extensions: ['.mjs', '.js', '.jsx'],
      }),
      commonjs({
        ignoreGlobal: true,
      }),
    ],
  },

  // umd
  {
    input,
    output: { exports: 'named', file: 'dist/use-overlay-scroll-position.umd.js', format: 'umd', name, globals },
    external: Object.keys(globals),
    plugins: [
      nodeResolve({
        extensions: ['.mjs', '.js', '.jsx'],
      }),
      babel(babelESM),
      commonjs(commonjsOptions),
      replace({ 'process.env.NODE_ENV': JSON.stringify('development') }),
    ],
  },

  // umd prod
  {
    input,
    output: { exports: 'named', file: 'dist/use-overlay-scroll-position.umd.min.js', format: 'umd', name, globals },
    external: Object.keys(globals),
    plugins: [
      nodeResolve({
        extensions: ['.mjs', '.js', '.jsx'],
      }),
      babel(babelESM),
      commonjs(commonjsOptions),
      replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
      terser({
        sourcemap: true,
      }),
    ],
  },
];
