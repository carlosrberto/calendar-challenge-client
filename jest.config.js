module.exports = {
  verbose: true,
  coverageDirectory: '.coverage',
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
  ],
  setupFiles: [
    './__mocks__/browser/localStorage.js',
  ],
};
