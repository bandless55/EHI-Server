//var nodeDir = require('node-dir');
var fs             = require('fs');
var path           = require('path');
var internalModule = require('./module'); 

/**
 * The module loader. Scans the Server for modules and initializes them as
 * objects with method properties that are agreeable with the Server API.
 * @constructor
 */
function ModuleLoader() {
}

/**
 * The module loader initializes by scanning for modules to load and grabbing
 * the configuration files into a list of Module objects so they can
 * initialize themselves.
 */
ModuleLoader.prototype.init = function() {
    modules = [];
    var dir     = path.resolve(__dirname, '../modules');
    
    fs.readdir(dir, function(err, files){
        files.forEach(function(element, index, array){
            fs.readFile(path.join(dir, element, 'config.json'), function(err, data){
                if(err) console.error(err);
                var toPush = Object.create(internalModule);
                toPush.metaData = JSON.parse(data);
                modules.push(toPush);
            }); 
        });
    });
};

ModuleLoader.prototype.getModules = function(){
    return modules;
};

var self = new ModuleLoader();
module.exports = self;