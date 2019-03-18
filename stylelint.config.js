module.exports = {
  processors: ['stylelint-processor-styled-components'],
  plugins: ['stylelint-selector-bem-pattern'],
  extends: [
    'stylelint-config-recommended',
    'stylelint-config-rational-order',
    'stylelint-config-styled-components',
  ],
  rules: {
    'plugin/selector-bem-pattern': {
      preset: 'bem',
    },
    'selector-class-pattern': null,
    'order/properties-alphabetical-order': null,
    'max-nesting-depth': 3,
    'number-leading-zero': null,
  },
};
