var http = require('http');
var express = require('express');
var moment = require('moment');
var _ = require('underscore');

require.extensions['.geojson'] = require.extensions['.json'];

var locations = require('./open-data/flu-shot/city-of-philadelphia/locations.geojson');

_.each(locations.features, function(l){
	
});


var app = express()
	.use(express.compress())
	.get('/locations', function(req,res,next){
		var bbox = req.param('bbox').split(',');
		bbox = _.map(bbox, function(m){return parseFloat(m);});
		
		var start_date = moment(req.param('start_date'), 'YYYY-MM-DD');
		var end_date = moment(req.param('end_date'),'YYYY-MM-DD');


		var filtered = _.filter(locations.features, function(f){

			var in_time_range = moment(f.properties.begin_date).isBefore(end_date) &&
								moment(f.properties.end_date).isAfter(start_date);

			var lat = parseFloat(f.properties.latitude);
			var lon = parseFloat(f.properties.longitude);
			return in_time_range && bbox[1] <= lat && bbox[3] >= lat
				&& bbox[0] <= lon && bbox[2] >= lon;
		});
		res.json({type : locations.type, features : filtered });
	})
	.use(express.static(__dirname + '/public'));

var port = process.env.PORT || 3030;
var server = http.createServer(app).listen(port);
console.log('Listening on port ' + port);