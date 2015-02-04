var path = require('path');

/**
 * The module prototype. All modules must be agreeable with server API by 
 * implementing methods described here.
 * @constructor
 */

function Module(config) {
	var dir = "../modules";
	var send; // TODO: document
	var get; //  TODO: document
 }

/**
 * The module initializes by requiring the implementation file and wrapping
 * the implementation functions for communicating with the database.
 */
Module.prototype.init = function() {
	var imp = require(path.resolve(dir, config.name));
	send = imp.send;
	get = imp.get;
};