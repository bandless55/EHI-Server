var http = require('http');
var influxdb = require('../../database/influxdb');

function Thermostat(){

}

Thermostat.prototype.getData = function(varName, callback){
    influxdb.query("Select " + varName + " from thermostat where time > now() - 1d").then(function(data){
        callback(data);
    });
};

Thermostat.prototype.sendComand = function(data){
    var options = {host:"192.168.1.50", port:"5000", path: '/?temp='+data.temp+'&mode='+data.mode};
    var req = http.request(options);
    req.end();
};


Thermostat.prototype.init = function(){
    console.log('init thermostat');
    var options = {host : '192.168.1.50', port : '5000', path : '/json'};
    callback = function(response) {
        var str = '';

        response.on('data', function (chunk) {
            str += chunk;
        });

        response.on('end', function () {
            influxdb.writeValue('thermostat', JSON.parse(str));
        });
    };
    setInterval(function() {
        http.request(options, callback).end();
    }, 300000);
};

var self = new Thermostat();
self.init();
module.exports = self;