var http = require('http');
var express = require('express');
require.extensions['.geojson'] = require.extensions['.json'];

var locations = require('./open-data/flu-shot/city-of-philadelphia/locations.geojson');

var app = express()
	.use(express.compress())
	.get('/locations', function(req,res,next){
		res.json(locations);
	})
	.use(express.static(__dirname + '/public'));

var port = process.env.PORT || 3030;
var server = http.createServer(app).listen(port);
console.log('Listening on port ' + port);