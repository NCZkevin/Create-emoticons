var express = require('express'),

app = express();
// 注意这里，如果带有了public，可以参考一下下面的输出信息
// 直接访问我们的资源即可，static表示加入资源至引用
app.use(express.static(__dirname+ '/src'));
// console.log(__dirname + '/public');

app.listen(8080);



// var http = require("http");
// var parse = require("url").parse;
// var fs = require("fs");
// var join = require("path").join;
//
// var root = __dirname;
//
// var server = http.createServer(function(req,res){
// 	var url = parse(req.url);
// 	var path = join(root,url.pathname);
// 	var stream = fs.createReadStream(path);
//   res.setHeader('access-control-allow-origin','*');
//   res.setHeader('access-control-allow-credentials','true ');
// 	stream.on('data',function(chunk){
// 		res.write(chunk);
// 	});
// 	stream.on('end',function(){
// 		res.end();
// 	});   //stream.pipe(res)
// });
//
// server.listen(8080);

// http.createServer(function(req,res){
//   var htmldata = "";
//   res.setHeader('access-control-allow-origin','*');
//   res.setHeader('access-control-allow-credentials','true ');
//   res.setHeader('Content-type',"text/html")
//   req.on('data',function (chunk) {
//     htmldata += chunk;
//   });
//   req.on('end',function () {
//     res.writeHead(200);
//
//   });
// }).listen(8080);
