var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
var path = require('path');
var conf = require('./package');
var pages = require('./page.config');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var TARGET = process.env.npm_lifecycle_event;
var merge = require('webpack-merge');


var common = {
    entry: pages.entry,
    plugins: [
      new ExtractTextPlugin('[name].css')
    ].concat(pages.html),
    
    resolve: {
        extensions: ['', '.js', '.jsx', '.css', '.scss'],
        modulesDirectories: ['node_modules'],
        alias: {
            moment: "moment/min/moment-with-locales.min.js"
        }
    },
    module: {
        noParse: [/moment-with-locales/]
    }
};
if (TARGET === 'start') {
    module.exports = merge(common, {
      devtool: 'eval-source-map',
      output: {
        path: path.join(__dirname),
        publicPath:["http://",conf.path.devHost+":"+conf.path.port].join('/'),
        filename: '[name].js'
      },
      module: {
        loaders: [
          {
                test: /\.jsx$/,
                loader: 'babel-loader!jsx-loader',
                include: __dirname
          },
          {
              test: /\.scss$/,
              loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
          }, 
          {
              test: /\.json$/,
              loader: 'json'
          },
          { test: /\.css$/, loader: 'style-loader?sourceMap!css-loader?sourceMap' },
          {test: /\.(jpg|png)$/, loader: "url?mimetype=image/png"}
          ]
      },
      plugins: [
          new webpack.HotModuleReplacementPlugin(),
          new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"'
        }),
      ],
      resolve: {
        alias: {
            goku: path.join(__dirname,'src','dev')
        }
      }
    });
}else{
    module.exports = merge(common, {
      output: {
          path: path.join(__dirname, 'dist', pages.cfg.name, pages.cfg.version),
          publicPath:"https://ami-static.b0.upaiyun.com/customerser/"+pages.cfg.name+"/"+pages.cfg.version+"/",
          filename: '[name].js'
      },
       module: {
        loaders: [
          {
                test: /\.jsx$/,
                loader: 'babel-loader!jsx-loader'
          },
          {
              test: /\.json$/,
              loader: 'json'
          },
          {
              test: /\.scss$/,
              loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader?outputStyle=compressed")
          },
          { test: /\.css$/, loader: 'style-loader!css-loader' },
          {test: /\.(jpg|png)$/, loader: "url?mimetype=image/png&limit=8192"}
          ]
      },
      plugins: [
          new ExtractTextPlugin('[name].css',{allChunks: false}),
          new webpack.optimize.CommonsChunkPlugin({name: 'common',minChunks: 4}),
          new webpack.DefinePlugin({
              'process.env.NODE_ENV': '"production"'
          }),
          new webpack.optimize.UglifyJsPlugin({
            compress: {
              warnings: false
            }
          })
      ],
      resolve: {
        alias: {
            goku: path.join(__dirname,'src','pro')
        }
      }
    });
}

