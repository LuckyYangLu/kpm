// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true,
    node: true,
    commonjs: true
  },
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
      arrowFunctions: true,
      classes: true,
      modules: true,
      defaultParams: true
    }
  },
  extends: [
    'standard',
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  plugins: ['html', 'react'],
  // 自定义规则
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // 语句强制分号结尾
    "semi": [2, "always"],
    "no-console": 0,
    // 开启定义必须使用
    "no-unused-vars": 0,
    // 关闭react中的定义错误
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
