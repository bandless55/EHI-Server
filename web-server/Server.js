var express = require('express');
var exphb   = require('express-handlebars');

/**
 * The main web server. Handles routing incoming HTTP requests
 * @constructor
 */
function Server(){
	//add needed variables here, but dont start the server yet.
    this.app = express();
    this.app.engine('handlebars'
}

/**
 * Starts up the web server, begins the port listening process.
 */
Server.prototype.init = function(){
	
};

var self = new Server();

module.exports = self;