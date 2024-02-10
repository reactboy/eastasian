// NOTE due to NX updates this is required: https://github.com/nrwl/nx/issues/20671#issuecomment-1848396559
const { composePlugins, withNx } = require('@nx/webpack');

// Nx plugins for webpack.
module.exports = composePlugins(withNx(), (config) => {
  // Update the webpack config as needed here.
  // e.g. `config.plugins.push(new MyPlugin())`
  return config;
});
