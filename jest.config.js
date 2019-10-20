const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig');

module.exports = {
  preset: 'ts-jest',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/'
  }),
  testURL: 'http://localhost',
  coverageDirectory: '<rootDir>/reports/coverage',
  collectCoverageFrom: ['<rootDir>/src/**/*.{ts,tsx}'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  },
  setupFiles: ['<rootDir>/jest.setup.ts'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.afterEnv.ts'],
  clearMocks: true,
  errorOnDeprecated: true
};
