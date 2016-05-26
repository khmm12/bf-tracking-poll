/*eslint-disable*/

const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const path = require('path');

module.exports = {
  webpack_assets_file_path: path.resolve(__dirname, '../public/assets/application/assets.json'),

  assets: {
    images: {
      extensions: ['png', 'jpg', 'gif', 'ico', 'svg'],
      parser: WebpackIsomorphicToolsPlugin.url_loader_parser,
      path(module, options, log) {
        return module.name;
      },
    },
    style_modules: {
      extensions: ['scss', 'css'],
      filter(module, regex, options, log) {
        return regex.test(module.name);
      },
      path(module, options, log) {
        return module.name;
      },
      parser: function(module, options, log) {
        return null;
      }
    }
  }
}
