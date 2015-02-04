var path = require('path');

/**
 * The module prototype. All modules must be agreeable with server API by 
 * implementing methods described here.
 * @constructor
 */

function Module(config) {
}

/**
 * The module initializes by requiring the implementation file and wrapping
 * the implementation functions for communicating with the database.
 */
Module.prototype.init = function() {
    console.log(this.metaData.name);
};