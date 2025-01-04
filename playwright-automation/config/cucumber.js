const path = require('path');

module.exports = {
  default: {
    require: ['specs/e2e/steps/**/*.ts', 'specs/e2e/support/**/*.ts'],
    format: [
      'progress',
      '@cucumber/pretty-formatter',
      path.resolve('./specs/e2e/support/allure-reporter')
    ],
    paths: ['specs/e2e/features/**/*.feature'],
    requireModule: ['ts-node/register'],
    worldParameters: {
      timeout: 60000
    }
  }
}; 