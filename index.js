var http = require('http');
var express = require('express');
require.extensions['.geojson'] = require.extensions['.json'];

var locations = require('./open-data/flu-shot/city-of-philadelphia/locations.geojson');
var _ = require('underscore');

var app = express()
	.use(express.compress())
	.get('/locations', function(req,res,next){
		var bbox = req.param('bbox').split(',');
		bbox = _.map(bbox, function(m){return parseFloat(m);});
		var filtered = _.filter(locations.features, function(f){
			var lat = parseFloat(f.properties.latitude);
			var lon = parseFloat(f.properties.longitude);
			return bbox[1] <= lat && bbox[3] >= lat
				&& bbox[0] <= lon && bbox[2] >= lon;
		});
		res.json({type : locations.type, features : filtered });
	})
	.use(express.static(__dirname + '/public'));

var port = process.env.PORT || 3030;
var server = http.createServer(app).listen(port);
console.log('Listening on port ' + port);