//Main entry point for the server

//all the main component imports
var webServer = require('web-server/Server.js');

//initialize in order
//(Server should probably be a singleton since we dont want to
// try and open another listening connsection on the same socket
//So I assume it is a singleton and it exports the main server Object


//This should start the main web server
webServer.init();