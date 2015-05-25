// Returns promise to return express object

/*jslint node: true */
/*jslint nomen: true*/
'use strict';

var config = require('./config'),
    Promise = require('bluebird'),
    service = require('../service');

var loadPrograms = function () {
    var deferred = Promise.defer();

    console.log();
    console.log('Loading programs for family ID ' + config.familyId);

    var requestData = {
        family_id: config.familyId
    };
    service.call('api/Program/GetAll', requestData)
        .then(function (response) {
            console.log('  Done!');
            //console.log();
            //console.log('YOUR PROGRAMS:');
            //console.log(response.program_scripts);
            deferred.resolve(response.program_scripts);
        });

    return deferred.promise;
};

module.exports = loadPrograms;