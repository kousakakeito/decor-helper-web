const path = require('path');

module.exports = {
  entry: './Public/App/src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, './Public/App/dist'),
  },
  mode: 'development',
  resolve: {
    alias: {
      'src': path.resolve(__dirname, './Public/App/src')
    }
  }
};
