var influx = require('influx');
var preferences = require('../Preferences/PreferencesManager');


/**
 * The database wrapper. Handles writing and querying of InfluxDB
 * @constructor
 */
function Database(){
    
}


/**
 * Initialize the database
 */
Database.prototype.init = function(){
    this.db = influx(preferences.get('database'));
    
    this.query = 'SELECT currTemp FROM thermostat';
    this.db.query(this.query, function(idk, data){
        console.log(data[0]);
    });
};

var self = new Database();
module.exports = self;