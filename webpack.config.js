// We have to give the following info
// entry point ->  output file

const path = require('path');


// where we write config details for our webpack build
module.exports = {
  entry: './src/app.js',
  output: {  // first is path, second is file name
    // path is the absolute path on your machine to where you want to
    // output that webpack file, we want to put in the public folder of this project
    // we can't use ./ , needs to be an absolute path

    //now we have access to path.join & we can use it to join our 2 paths
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  }, // setting up loader
  module: { // rules defines how you want to use your loader
    rules: [{
      loader: 'babel-loader', // what loader are we trying to use?
      test: /\.js$/, // what files do we actually want to run this loader on?
      exclude: /node_modules/ // lets us exclude a given set of files in our case the node modules
    }, {
      test: /\.s?css$/ ,  // target all files that end in .css
      use: [ // use allows us to specify an array of loader when u have more than 1
        'style-loader',
        'css-loader',
        'sass-loader'
      ]
    }]
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: { // setting up webpack devserver
  // many other config options available in Webpack devserver documentation
    contentBase: path.join(__dirname, 'public'),
    historyApiFallback: true // tells our dev server that we are going to be
    // handling routing via our client side & that it should return this page

  }
};
