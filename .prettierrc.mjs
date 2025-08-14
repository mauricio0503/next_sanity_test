const config = {
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  arrowParens: 'avoid',
  semi: false,
  singleQuote: true,
  trailingComma: 'es5',
  printWidth: 72,
  singleAttributePerLine: true,
  importOrder: [
    '<THIRD_PARTY_MODULES>',
    '^@/(.*)$',
    '^[./]',
    '<TS_TYPES>^[./]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
}
export default config