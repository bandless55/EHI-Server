//Main entry point for the server

//all the main component imports
var webServer = require('./web-server/Server');
var Preferences = require('./preferences/PreferencesManager');
var Database = require('./database/influxdb');

//initialize in order
//So we load the config FIRST, then when it is done
//we can load other stuff in order using promises
Preferences.load().then( function(){
	
	console.log("Prefs loaded");
	Database.init();
	//load some other things here... if they do stuff thats async,
	//and you need to wait for it to finish
	//have them return a Promise and then use another then
	
}).then(function(){
	webServer.init();
	
}).catch(function(err){
	console.error(err);
});