const isApi = !!process.env.API

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testTimeout: 10000,
    collectCoverageFrom: ['<rootDir>/src/api/v1/logic/*', '<rootDir>/src/api/v1/facade/impl/*'],
    testMatch: isApi ? ['<rootDir>/src/specs/integration/*'] : ['<rootDir>/src/specs/unitary/*'],
    // setupFiles: ['<rootDir>/src/specs/config/setup-tests.ts'],
};
