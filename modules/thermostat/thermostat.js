var http   = require('http');
var influx = require('influx');

var dbInflux = influx({host:"192.168.1.84", port:8086, username:"root", password:"root", database:"testDB"});

function thermostatModule() {
    
}

thermostatModule.prototype.startLogging = function(){
    var options = {host : '192.168.1.50', port : '5000', path : '/json'};
    callback = function(response) {
        var str = '';

        response.on('data', function (chunk) {
            str += chunk;
        });

        response.on('end', function () {
            dbInflux.writePoint('thermostat', JSON.parse(str), function(err){if(err) throw err;});
        });
    };
    setInterval(function() {
        http.request(options, callback).end();
    }, 10000);
};

var self = new thermostatModule();
module.exports = self;