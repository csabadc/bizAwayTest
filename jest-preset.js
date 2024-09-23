module.exports = {
  preset: '@nestjs/testing',
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$', // Only include .spec.ts files
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  collectCoverage: true, // Enable coverage collection
  collectCoverageFrom: [
    '**/*.ts', // Collect coverage from all .ts files
    '!**/node_modules/**', // Exclude node_modules
    '!**/*.module.ts', // Exclude module files
    '!**/main.ts', // Exclude main entry file
    '!**/*.spec.ts', // Exclude test files
  ],
  coverageDirectory: '../coverage', // Specify the coverage output directory
  coverageThreshold: { // Set coverage thresholds
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  testPathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/node_modules/'],
  setupFilesAfterEnv: ['<rootDir>/../jest.setup.js'], // Optional setup file for global configurations
};
