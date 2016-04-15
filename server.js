var http = require("http");
var parse = require("url").parse;
var fs = require("fs");
var join = require("path").join;

var root = __dirname;

var server = http.createServer(function(req,res){
	var url = parse(req.url);
	var path = join(root,url.pathname);
	var stream = fs.createReadStream(path);
  res.setHeader('access-control-allow-origin','*');
  res.setHeader('access-control-allow-credentials','true ');
	stream.on('data',function(chunk){
		res.write(chunk);
	});
	stream.on('end',function(){
		res.end();
	});   //stream.pipe(res)
});

server.listen(8080);

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
