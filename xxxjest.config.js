// jest.config.js
module.exports = {
  transform: {
    '^.+\\.(js|jsx)?$': 'babel-jest', 
  },
  "transformIgnorePatterns": [
    "node_modules/(?!axios)/"
  ],
  extensionsToTreatAsEsm: ['.jsx'],
  testEnvironment: 'jsdom',
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
};
