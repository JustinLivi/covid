module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['jest-extended'],
  coverageThreshold: {
    global: {
      statements: 100,
      lines: 100,
      functions: 100,
      branches: 100,
    },
  },
  collectCoverageFrom: ['src/**/*.ts', '!**/*.test.ts', '!src/index.ts', '!**/*.d.ts'],
  globals: {
    'ts-jest': {
      diagnostics: {
        pathRegex: '^src/((?\\.test\\.ts).)*$',
      },
    },
  },
};
