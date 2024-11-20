module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  extends: ['plugin:vue/recommended', 'airbnb-base'],
  plugins: ['vue', 'frabbit-vue'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'import/prefer-default-export': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'linebreak-style': 0,
    'import/no-cycle': 'off',
    'no-console': ['warn', { allow: ['error'] }],
    'no-bitwise': 'off',
    'no-underscore-dangle': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/no-reserved-component-names': 'warn',
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: [
          'store', // for vuex store
          'state', // for vuex state
        ],
      },
    ],
    'vue/no-unused-properties': ['error', {
      groups: ['props', 'data', 'computed', 'methods', 'setup'],
    }],
  },
};
