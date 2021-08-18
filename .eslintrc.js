module.exports = {
  env: {
    node: true,
    commonjs: true,
  },
  extends: ['eslint:recommended', 'airbnb'],
  plugins: [],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'no-else-return': 0,
    'max-len': ['error', { code: 120 }],
  },
};
