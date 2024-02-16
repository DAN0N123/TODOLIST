const path = require('path');

module.exports = {
  watch: true,
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'frontend/dist'),
  },
  resolve: {
    fallback: {
      "timers": false,
      "assert": false,
      "buffer": false,
      "child_process": false,
      "crypto": false,
      "events": false,
      "fs": false,
      "http": false,
      "https": false,
      "os": false,
      "path": false,
      "querystring": false,
      "stream": false,
      "string_decoder": false,
      "url": false,
      "util": false,
      "zlib": false
    },
  }
};