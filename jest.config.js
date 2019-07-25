module.exports = {
  moduleFileExtensions: ['js', 'json', 'vue'],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.js$': 'babel-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/lib/$1',
    '^~/(.*)$': '<rootDir>/lib/$1',
  },
  testMatch: ['**/**/__tests__/*.test.js'],
  setupFiles: ['<rootDir>/jest.setup.js'],
  rootDir: './',
  snapshotSerializers: ['jest-serializer-vue'],
  testURL: 'http://localhost:3000',
  verbose: true,
}
