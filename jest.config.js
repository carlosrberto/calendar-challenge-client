module.exports = {
  coverageDirectory: '.coverage',
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
  ],
  setupFiles: [
    './__mocks__/browser/localStorage.js',
  ],
};
