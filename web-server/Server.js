var express = require('express');
var influx  = require('influx');
var path    = require('path');

var dbInflux = influx({host:"192.168.1.84", port:8086, username:"root", password:"root", database:"testDB"});
var app = express();

var query = 'SELECT currTemp FROM thermostat WHERE time > now() - 30m';
var public = path.resolve(__dirname+'/../public/');

app.use(express.static(public));

app.get('/', function(req, res){
    res.sendFile(public+'index.html');
});

app.get('/thermostatData', function(req, res){
    dbInflux.query(query, function(idk, data){
        res.json(data[0].points);
    });
});

/**
 * The main web server. Handles routing incoming HTTP requests
 * @constructor
 */
function Server() {
	//add needed variables here, but dont start the server yet.
}

/**
 * Starts up the web server, begins the port listening process.
 */
Server.prototype.init = function(){
	app.listen(3000);
};


var self = new Server();
module.exports = self;