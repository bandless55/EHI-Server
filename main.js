//Main entry point for the server

//all the main component imports
var webServer = require('./web-server/Server.js');
var Preferences = require('./Preferences/PreferencesManager');

//initialize in order
//So we load the config FIRST, then when it is done
//we can load other stuff in order using promises
Preferences.load().then( function(){
	
	console.log("Prefs loaded");
	//load some other things here... if they do stuff thats async,
	//and you need to wait for it to finish
	//have them return a Promise and then use another then
	
}).then(function(){
	webServer.init();
	
}).catch(function(err){
	console.error(err);
});