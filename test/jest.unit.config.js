module.exports = {
  moduleFileExtensions: ['js', 'json'],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  testMatch: ['**/test/unit/**/*.test.js'],
  verbose: true,
}
