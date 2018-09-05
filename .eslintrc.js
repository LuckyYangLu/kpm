module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'es6': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  "parser": "babel-eslint",
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    },
    'ecmaVersion': 7,
    'sourceType': 'module'
  },
  'plugins': [
    'react'
  ],
  'rules': {
    'no-console': 'off', // 不禁用console
    'no-debugger': 1, // 不禁用debugger
    'no-var': 1, // 禁用 var
    'no-alert': 2, // 禁止 alert
    'no-irregular-whitespace': 0, // 不规则的空白不允许
    'no-mixed-spaces-and-tabs': 0, // 禁止混用tab和空格
    'camelcase': 0, // 强制驼峰法命名
    "comma-dangle": 2, // 对象字面量项尾不能有逗号
    'indent': ['error', 2],
    'linebreak-style': ['error', 'windows'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'react/forbid-prop-types': [2, {'forbid': ['any']}], // 禁止某些propTypes
    'react/prop-types': 0, // 防止在React组件定义中丢失props验证
  }
};