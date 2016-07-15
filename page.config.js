var HtmlWebpackPlugin = require('html-webpack-plugin');
var conf = require('./package');
var TARGET = process.env.npm_lifecycle_event;
var path = require('path');
var pagecfg = require('./src/page');
var vpath = path.join(__dirname,"view",conf.target,pagecfg.version);
var jspath = "./src/"+conf.target+"/";
if(TARGET === 'start'){vpath="";}
var template = "src/"+conf.target+"/templates/";


// 配置页面
var page = pagecfg.name;
var htmlArr = [];
var asArr = {};
for(var i = 0 ; i < page.length ; i++){
	htmlArr.push(
		new HtmlWebpackPlugin({
			favicon: 'favicon.ico',
			filename: path.join(vpath,page[i]+'.html'),
			template: template+page[i]+".html",
			chunks: [page[i],'common'],
			minify:{
	            removeComments:true,
	            collapseWhitespace:false
	        }
		})
	)
	asArr[page[i]]=[
        jspath+page[i]
    ]
}
//配置html
module.exports.html = htmlArr;

//配置静态资源
module.exports.entry = asArr;

//页面配置
module.exports.cfg = {
	name: conf.target,
	version: pagecfg.version
}