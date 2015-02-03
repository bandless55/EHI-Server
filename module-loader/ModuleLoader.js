var nodeDir = require('node-dir');
// var fs = require('fs');
// var path = require('path');

/**
 * The module loader. Scans the Server for modules and initializes them as
 * objects with method properties that are agreeable with the Server API.
 * @constructor
 */
function ModuleLoader() {
 var dir = "../modules";
 var modules = [];
}

/**
 * The module loader initializes by scanning for modules to load and grabbing
 * the configuration files into a list of Module objects so they can
 * initialize themselves.
 */
ModuleLoader.prototype.init = function() {
// async solution that doesn't scale well
/* fs.readdir(dir, function(err, filenames) {
  if (err) throw err;
  filenames.forEach(function(name) {
   var path = path.resolve(dir, name);
   modules.push(Module(JSON.parse(fs.readfile(path))));
  });
 });
*/
// "sequential" (async or [probably]sync?) solution that scales well
// node-dir supports async dir scanning but without options -> wtf?
 nodeDir.readFiles(dir, {
  matchDir: /[\w.]+module/,
  match: /[\w.]+json/ },
  function(err, file, next) {
   if (err) throw err;
   modules.push(Module(JSON.parse(file)));
   next();
  });
// see node-walk for more advanced async solution that scales well
// see simple node-walk example:
// http://stackoverflow.com/questions/2727167/getting-all-filenames-in-a-directory-with-node-js
};

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
 send = imp.send();
 get = imp.get();
};

var self = new ModuleLoader();

module.exports = self;