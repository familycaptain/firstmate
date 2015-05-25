// Returns current app settings based on environment  

/*jslint node: true */
/*jslint nomen: true*/
'use strict';

var ScriptApi = require('../ScriptApi'),
    Promise = require('bluebird');

var initApi = function (eventEmitter) {
    var deferred = Promise.defer(),
        FM;
    
    console.log();
    console.log('Initializing First Mate API');
    
    FM = new ScriptApi(eventEmitter);
    deferred.resolve(FM);
    
    return deferred.promise;
};

module.exports = initApi;