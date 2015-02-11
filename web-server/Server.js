var path         = require('path');
var express      = require('express');
var bodyParser   = require('body-parser');
var exphbs       = require('express-handlebars');
var helpers      = require('./helpers');
var moduleLoader = require('../module_loader/module_loader');

/**
 * The main web server. Handles routing incoming HTTP requests
 * @constructor
 */
function Server(){
    this.app = express();
    this.app.set('views', path.resolve(__dirname+'/views'));
    this.publicPath = path.resolve(__dirname+'/public/');
    this.hbs = exphbs.create({
        defaultLayout : 'main',
        helpers       : helpers,
        layoutsDir    : path.resolve(__dirname+"/views/layouts/"),
        partialsDir   : path.resolve(__dirname+"/views/partials/")
    });
    this.app.engine('handlebars', this.hbs.engine);
    this.app.set('view engine', 'handlebars');
    this.app.use(express.static(this.publicPath));
    this.postParser = bodyParser.urlencoded({ extended: false });

    
    this.app.get('/', function(req, res){
        res.render('dashboard', {
            active  : {active_dashboard : true},
            sidebar : [{value : "Overview", href : "/", active : true}],
            modules : moduleLoader.getModules()
            });
    });    
    
    this.app.get('/modules/:index', function(req, res){
        res.render('modules', {
            sidebar : {modules : moduleLoader.getModules(), index : req.params.index},
            current : moduleLoader.getModules()[req.params.index]
        }); 
    });
    this.app.get('/modules/:index/graphs', function(req, res){
        moduleLoader.getModules()[req.params.index].getData(req.query.varName, function(data){
            res.json(data[0].points);
        });
    });
    this.app.post('/modules/:index', this.postParser, function(req, res){
        if (!req.body) res.sendStatus(400).end();
        else {
            moduleLoader.getModules()[req.params.index].sendComand(req.body);
            res.end();
        }
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
    console.log('Web server running on port 3000');
	this.app.listen(3000);
};

var self = new Server();
module.exports = self;