var webpack = require('webpack');

var port = JSON.parse(process.env.npm_package_config_port || 3000),
    subdomain = process.env.npm_package_config_subdomain ? JSON.parse(process.env.npm_package_config_subdomain) : null,
    url = subdomain ?
      'https://' + subdomain + '.localtunnel.me' :
      'http://localhost:' + port;

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?' + url,
    'webpack/hot/only-dev-server',
    './scripts/index'
  ],
  output: {
    path: __dirname,
    filename: 'bundle.js',
    publicPath: '/scripts/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['react-hot', 'jsx?harmony'] },
    ]
  }
};
