const path = require('path');
const webpack = require('webpack');

function createConfig (env) {
  var isProduction, webpackConfig;

  if (env === undefined) {
    env = process.env.NODE_ENV;
  }

  isProduction = env === 'production';

  webpackConfig = {
    entry:   './src/app.js',
    output:  {
      path:       path.join(__dirname, '../../build/js'),
      filename:   'app.js',
      publicPath: 'js/'
    },
    devtool: isProduction ? '#source-map' : '#cheap-module-eval-source-map',
    module:  {
      rules: [
        {
          test: require.resolve("jquery"),
          use:  [
            {
              loader:  'expose-loader',
              options: 'jQuery'
            }, {
              loader:  'expose-loader',
              options: '$'
            },
          ]
        },
        {
          test:    /\.js$/,
          exclude: /node_modules/,
          loader:  'babel-loader',
          options: {
            presets: ['es2015', 'stage-2']
          }
        }
      ]
    },
    plugins: [
      // new webpack.optimize.CommonsChunkPlugin({
      //     name: 'vendor',
      //     filename: '[name].js',
      //     minChunks: Infinity
      // }),
      // uncomment in case of emergency code formatter need
      // new PrettierPlugin({
      //     printWidth: 80,
      //     tabWidth: 4
      // }),
      new webpack.ProvidePlugin({
        $:               'jquery',
        jQuery:          'jquery',
        'window.jQuery': 'jquery'
      }),
      new webpack.NoEmitOnErrorsPlugin(),
    ],
  };

  if (isProduction) {
    webpackConfig.plugins.push(
      new webpack.LoaderOptionsPlugin({
        minimize: true
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    );
  }

  return webpackConfig;
}

module.exports = createConfig();
module.exports.createConfig = createConfig;