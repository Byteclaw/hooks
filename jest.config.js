module.exports = {
  // hack because jest does not support global* in project configs
  // https://github.com/facebook/jest/issues/5441
  // globalSetup: '<rootDir>/node_modules/jest-environment-puppeteer/setup',
  // globalTeardown: '<rootDir>/node_modules/jest-environment-puppeteer/teardown',
  projects: [
    '<rootDir>/packages/use-overflow-scroll-position/jest.config.js',
  ],
};
