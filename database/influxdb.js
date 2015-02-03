var influx = require('influx');
var preferences = require('../preferences/PreferencesManager');


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
};

/**
 * Queries the database 
 * @param {string} queryString - Query to execute
 */
Database.prototype.query = function(queryString){
	this.db.query(queryString);
};

/**
 * Writes a value to the database
 * @param {string} series - name of the series to write to
 * @param {Object} value - value to be written in a key/value format
 */
Database.prototype.writeValue = function(series, value){
	this.db.writePoint(series, value);
};

Database.prototype.readSeries = function(){
	
};

var self = new Database();
module.exports = self;