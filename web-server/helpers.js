var util = require('util');

exports.increment = function(data){
    return data + 1;
};

exports.ifActive = function(data, options){
    return data == options.data.root.sidebar.index ? "active" : "";
};

exports.DEBUG = function(data, options){
    console.log('data:\n' + util.inspect(data));
    console.log('options:\n' + util.inspect(options));
};