module.exports = {
  ...require('@aonic-ui/jest-config/jest.config.cjs'),
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!lodash-es)'],
};
