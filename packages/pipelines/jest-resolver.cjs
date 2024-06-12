module.exports = (request, options) => {
  if (request.startsWith('@console/internal') || request.startsWith('@openshift-console')) {
    return `${options.rootDir}/__mocks__/console-dynamic-plugin-sdk.js`;
  }
  return options.defaultResolver(request, options);
};
