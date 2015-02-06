var influxdb = require('../../database/influxdb');

function Thermostat(){

}

Thermostat.prototype.getData = function(varName, callback){
    influxdb.query("Select " + varName + " from thermostat").then(function(data){
        callback(data);
    });
};

Thermostat.prototype.init = function(){
};

var self = new Thermostat();
module.exports = self;