module.exports = {
  entry: './src/ng-sizer.js',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      }
    ]
  },
  output: {
    filename: 'ng-sizer.js',
    library: 'ngSizer',
    libraryTarget: 'umd'
  }
};