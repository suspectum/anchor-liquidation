/* config-overrides.js */
/* eslint-disable react-hooks/rules-of-hooks */
const { ProvidePlugin } = require('webpack');
const { useBabelRc, override } = require('customize-cra');

module.exports = override(useBabelRc());

module.exports = function override(config) {
  config.ignoreWarnings = [/Failed to parse source map/];
  config.resolve.fallback = {
    crypto: require.resolve('crypto-browserify'),
    stream: require.resolve('stream-browserify'),
    buffer: require.resolve('buffer'),
  };

  config.plugins.push(
    new ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process/browser',
    })
  );

  return config;
};
