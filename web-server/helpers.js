var util = require('util');

exports.increment = function(data){
    return data + 1;
};

exports.ifActive = function(data, options){
    return data == options.data.root.sidebar.index ? "active" : "";
};

exports.isNumber = function(type, options){
    if(type == 'number')
        return options.fn(this);
};

exports.isRadio = function(type, options){
    if(type == 'radio')
        return options.fn(this);
};


exports.DEBUG = function(data, options){
    console.log('data:\n' + util.inspect(data));
    console.log('options:\n' + util.inspect(options));
};