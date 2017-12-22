const webpack = require('webpack');

// the client which connects to our middleware:
const hotMiddlewareScript = 'webpack-hot-middleware/client';

let config = {
  output: {
    path: __dirname + "/dist/js/", // path where bundled file gets put
    publicPath: '/dist/js/',  // path that the in-memory bundled files will get served from for middleware
    filename: '[name].js' // [name] sets bundled file name to that of the original un-bundled file
  },
  module:{
    loaders:[
      {
        test: /\.js$/, exclude: /node_modules/,
        loader:'babel-loader?cacheDirectory=true'
      }
    ]
  },
}

// set webpack config object according to node environment variable
function configMaker(env){

  if(env === 'dev'){
    config.devtool = 'eval-source-map';
    config.entry = {
      // include the hot middleware with each entry point
      client: [__dirname + '/client/js/client.js', hotMiddlewareScript],
    },
    config.plugins = [
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.EnvironmentPlugin({
        HOSTDOMAIN: 'https://still-ridge-33795.herokuapp.com'
      })
    ];
    return config;
  } else if(env === 'build' ) {
    config.entry = {
      client: __dirname + '/client/js/client.js',
    },
    config.plugins = [
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.EnvironmentPlugin({
        HOSTDOMAIN: 'https://still-ridge-33795.herokuapp.com'
      })
    ];
    return config;
  }
}

let outPutConfig = configMaker(process.env.NODE_ENV);

module.exports = outPutConfig;
