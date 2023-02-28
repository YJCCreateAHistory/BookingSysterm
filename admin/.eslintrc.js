module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      tsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    quotes: [2, 'single'],
    'no-var': 1,
    semi: 2,
    'no-irregular-whitespace': 0,
    'no-unused-vars': 2,
    'no-alert': 2,
    'no-class-assign': 2,
    'no-dupe-keys': 2,
    'no-func-assign': 2,
    'no-redeclare': 2,
    'no-undef': 2,
    'no-use-before-define': 2,
    camelcase: 2,
    'jsx-quotes': [2, 'prefer-double'], // jsx里使用双引号
    'react/jsx-no-bind': 0,
    'react/jsx-no-undef': 1,
    'react/no-multi-comp': 2,
    'react/no-deprecated': 1,
    'no-mixed-spaces-and-tabs': 0,
  },
};
