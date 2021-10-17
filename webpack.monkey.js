const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const glob = require('glob');

function getEntries() {
  let entries = glob
    .sync('src/*.entry.tsx')
    .map((e) => [path.basename(e, '.entry.tsx'), path.resolve(e)]);
  return Object.fromEntries(entries);
}

function setHtmlPlugins(webpackConfig) {
  const htmlFiles = glob.sync('src/*.html');
  const htmlPlugins = htmlFiles.map((file) => {
    return new HtmlWebpackPlugin({
      chunks: [path.basename(file, '.html')],
      filename: path.basename(file),
      template: path.resolve(file),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    });
  });
  // replace item[0] (default html plugin) with html plugins
  webpackConfig.plugins.splice(0, 1, ...htmlPlugins);
}

module.exports = function (webpackConfig, isDevelopment) {
  if (!isDevelopment) {
    webpackConfig.entry = getEntries();
    setHtmlPlugins(webpackConfig);
    delete webpackConfig.optimization.splitChunks;
    webpackConfig.optimization.runtimeChunk = false;
  }
};
