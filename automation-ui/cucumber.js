module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: ['e2e/steps/*.ts', 'e2e/support/*.ts'],
    format: [
      'summary',
      ['allure-cucumberjs', {
        isEnabled: true,
        outputDir: './allure-results'
      }]
    ],
    formatOptions: { snippetInterface: 'async-aware' }
  }
}; 