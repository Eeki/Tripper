const path = require('path');
var webpack = require('webpack');

const PATHS = {
  app: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'build'),
  style: path.join(__dirname, 'src/styles')
};

module.exports = {
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:3000', // WebpackDevServer host and port
    'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
    './src/index.js' // Your appʼs entry point
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: PATHS.build,
    publicPath: "/assets/",
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
      exclude: /node_modules/,
      loaders: ['react-hot', 'babel']
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};



/*module.exports = {
 entry: [
 './src/index.js'
 ],
 output: {
 path: __dirname,
 publicPath: '/',
 filename: 'bundle.js'
 },
 module: {
 loaders: [{
 exclude: /node_modules/,
 loader: 'babel'
 }]
 },
 resolve: {
 extensions: ['', '.js', '.jsx']
 },
 devServer: {
 historyApiFallback: true,
 contentBase: './'
 }
 };*/
