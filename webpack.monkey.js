module.exports = function (webpackConfig, isDevelopment) {
  if (!isDevelopment) {
    delete webpackConfig.optimization.splitChunks;
    webpackConfig.optimization.runtimeChunk = false;
  }
};
