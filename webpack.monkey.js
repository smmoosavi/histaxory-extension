const path = require('path');
const glob = require('glob');

function getEntries() {
  let entries = glob
    .sync('src/*.entry.tsx')
    .map((e) => [path.basename(e, '.entry.tsx'), path.resolve(e)]);
  return Object.fromEntries(entries);
}

module.exports = function (webpackConfig, isDevelopment) {
  if (!isDevelopment) {
    webpackConfig.entry = getEntries();
    delete webpackConfig.optimization.splitChunks;
    webpackConfig.optimization.runtimeChunk = false;
  }
};
