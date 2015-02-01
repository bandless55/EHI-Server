//This class is responsible for reading and writing preferences 
//to/from the the config preferences file
var fs = require('fs');
var Promise = require('bluebird');

//turn callback async code to be Promise based
Promise.promisifyAll(fs);

var _preferences;
var _loading = false;

/**
 * @private
 */
function _loadPrefFile(){
	return fs.readFileAsync('config.json')
	.then( function(value){
		console.log("File loaded");
		try{
			_preferences = JSON.parse(value);
		}catch(e){
			throw new Error("Could not parse config.json");
		}
	}, function(reason){
		throw new Error(reason);
	});
}

/**
 * Loads the preferences files
 */
function load(){
	if(_loading === true){
		return false;
	}
	_loading = true;
	return _loadPrefFile();
}

/**
 * @private
 */
function _writePrefFile(){
	fs.writeFile("../config.json", _preferences)
	.catch(function(reason){
		throw new Error("Unable to write the preferences");
	});
}

/**
 * Returns the data read from the preferences file
 * @param {string} context The name of the preference context
 * @returns {Object|null} Object or null if Preferences aren't loaded
 */
function get(context){
	if(_preferences === null){
		load();
		return;
	}
	
	if(context === null){
		return Promise.resolve(_preferences);
	} else {
		return Promise.resolve(_preferences[context]);
	}
}

/**
 * Writes a preference to the config file
 * @param {string} context the name of the context to write to
 * @param {string} key the name of the key
 * @param {string} value the value for the key to be written
 */
function set(context, key, value){
	if(_preferences === null){
		load();
		return;
	} else {
		if(context){
			_preferences[context].key = value;
		} else {
			_preferences.key = value;
		}
	}
	
}

/**
 * Checks whether or not you can get the preferences yet
 * @returns {bool}
 */
function isReady(){
	if(_preferences === null){
		return false;
	}
	
	return true;
}

module.exports.load = load;
module.exports.get = get;
module.exports.set = set;
module.exports.isReady = isReady;