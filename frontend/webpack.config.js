const path = require('path');
const webpack = require('webpack');
module.exports = {
  watch: true,
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
  },
  resolve: {
    modules: [
      path.resolve(__dirname, '../backend/node_modules'), // Look for modules in backend/node_modules
      'node_modules', // Also look in the default node_modules directory
    ],
    fallback: {
      async_hooks: false,
      "timers": require.resolve('timers-browserify'), // Use timers-browserify for timers
      "assert": require.resolve('assert'),
      "buffer": require.resolve('buffer'),
      "child_process": false, // No fallback needed for this module
      "crypto": require.resolve('crypto-browserify'), // Use crypto-browserify for crypto
      "events": require.resolve('events'),
      "fs": false, // No fallback needed for this module
      "http": require.resolve('stream-http'), // Use stream-http for http
      "https": require.resolve('https-browserify'), // Use https-browserify for https
      "os": require.resolve('os-browserify/browser'), // Use os-browserify for os
      "path": require.resolve('path-browserify'), // Use path-browserify for path
      "querystring": require.resolve('querystring-es3'), // Use querystring-es3 for querystring
      "stream": require.resolve('stream-browserify'), // Use stream-browserify for stream
      "string_decoder": require.resolve('string_decoder'), // Use string_decoder for string_decoder
      "url": require.resolve('url'), // Use url for url
      "util": require.resolve('util'), // Use util for util
      "zlib": require.resolve('browserify-zlib'), // Use browserify-zlib for zlib
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    // fix "process is not defined" error:
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
    new webpack.ProvidePlugin({
        process: 'process/browser',
    }),
  ]
};
