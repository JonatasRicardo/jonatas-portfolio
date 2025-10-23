import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      { useESM: true, tsconfig: '<rootDir>/tsconfig.json' }
    ],
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/app/$1',
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '\\.(png|jpg|jpeg|gif|svg|webp|avif)$': '<rootDir>/test/__mocks__/fileMock.js'
  },
  testMatch: ['**/?(*.)+(test|spec).(ts|tsx)'],
  collectCoverageFrom: ['app/**/*.(ts|tsx)'],
};

export default config;



