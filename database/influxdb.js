var influx = require('influx');
var preferences = require('../preferences/PreferencesManager');

var Promise = require('bluebird');


/**
 * The database wrapper. Handles writing and querying of InfluxDB
 * @constructor
 */
function Database(){
	this.db = null;
}


/**
 * Initialize the database
 */
Database.prototype.init = function(){
	this.db = influx(preferences.get('database'));
	this.db.query = Promise.promisify(this.db.query);
};

/**
 * Queries the database 
 * @param {string} queryString - Query to execute
 */
Database.prototype.query = function(queryString){
	return this.db.query(queryString);
};

/**
 * Writes a value to the database
 * @param {string} series - name of the series to write to
 * @param {Object} value - value to be written in a key/value format
 */
Database.prototype.writeValue = function(series, value){
	this.db.writePoint(series, value);
};

var self = new Database();
module.exports = self;