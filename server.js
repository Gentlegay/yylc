var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var conf = require('./package');
new WebpackDevServer(webpack(config), {
  historyApiFallback: true,
  headers: { 'Access-Control-Allow-Origin': '*' }
}).listen(conf.path.port, conf.path.devHost, function (err, result) {
  if (err) console.log(err);
});