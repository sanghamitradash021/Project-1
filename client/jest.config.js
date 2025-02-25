// export default {
//   preset: 'ts-jest', // Use ts-jest for TypeScript support
//   testEnvironment: 'jsdom', // Simulate a browser environment for React components
//   testMatch: ['**/src/**/*.(test|spec).[jt]s?(x)'], // Find all .test.tsx and .spec.tsx files
//   moduleDirectories: ['node_modules', 'src'], // Allow importing modules from src
//   setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'], // Runs setup before tests
// };

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
};

export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  testEnvironment: 'jsdom',
};
