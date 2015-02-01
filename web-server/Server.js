var path    = require('path');
var express = require('express');
var exphbs  = require('express-handlebars');
var helpers = require('./helpers');

/**
 * The main web server. Handles routing incoming HTTP requests
 * @constructor
 */
function Server(){
    this.publicPath = path.resolve(__dirname+'/../public/');
    this.hbs = exphbs.create({
        defaultLayout : 'main',
        helpers       : helpers
    });
    
    this.app = express();
    this.app.engine('handlebars', this.hbs.engine);
    this.app.set('view engine', 'handlebars');

    this.app.use(express.static(this.publicPath));

    this.app.get('/', function(req, res){
        res.render('dashboard', 
            {active : {active_dashboard : true}});
    });
    this.app.get('/modules', function(req, res){
        res.render('modules', 
            {active : {active_modules : true}});
    });
    this.app.get('/settings', function(req, res){
        res.render('settings', 
            {active : {active_settings : true}});
    });
}

/**
 * Starts up the web server, begins the port listening process.
 */
Server.prototype.init = function(){
	this.app.listen(3000);
};

var self = new Server();
module.exports = self;