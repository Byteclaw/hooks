module.exports = {
  displayName: '@byteclaw/use-overflow-scroll-position',
  rootDir: __dirname,
  globals: {
    'ts-jest': {
      diagnostics: true,
    },
  },
  setupTestFrameworkScriptFile: '<rootDir>/jest/setup.js',
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/**/__tests__/*.(test|spec).{js,jsx,ts,tsx}'],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
    '^.+\\.(ts|tsx)$': 'ts-jest',
  }
};
