var http = require('http');
var express = require('express');

var app = express()
	.use(function(req,res,next){
		if(req.url === '/locations'){
			res.json({light: "orange"});
		}
		else{
			next();
		}
	})
	.use(express.static(__dirname + '/public'));

var port = process.env.PORT || 3030;
var server = http.createServer(app).listen(port);
console.log('Listening on port ' + port);