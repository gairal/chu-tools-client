module.exports = {
  plugins: ['stylelint-selector-bem-pattern', 'stylelint-scss'],
  extends: [
    'stylelint-config-sass-guidelines',
    'stylelint-config-concentric-order',
  ],
  rules: {
    'plugin/selector-bem-pattern': {
      preset: 'bem',
    },
    'selector-class-pattern': null,
    'order/properties-alphabetical-order': null,
    'max-nesting-depth': 3,
    'number-leading-zero': null,
    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'apply',
          'responsive',
          'variants',
          'screen',
          'extend',
          'at-root',
          'debug',
          'warn',
          'error',
          'if',
          'else',
          'for',
          'each',
          'while',
          'mixin',
          'include',
          'content',
          'return',
          'function',
        ],
      },
    ],
  },
};
