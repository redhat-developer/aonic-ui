module.exports = {
  ...require('@aonic-ui/jest-config/jest.config.cjs'),
  resolver: '<rootDir>/jest-resolver.cjs',
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!lodash-es)'],
};
