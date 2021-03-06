const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    main: "./src/index.js",
  },
  output: {
    filename: "bundle.js",
    path: path.resolve("./dist"),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',

      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|jpeg)$/,
        loader: 'file-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  optimization: {},
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.css'],
  //   modules: [path.join(__dirname, '../node_modules'),
  //   ],
  },
  devServer: {
    host: 'localhost',
    historyApiFallback: true,
    // port: port,
    // hot: true,
  },
};