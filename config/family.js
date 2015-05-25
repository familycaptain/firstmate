// Returns promise to return express object

/*jslint node: true */
/*jslint nomen: true*/
'use strict';

var config = require('./config'),
    Promise = require('bluebird'),
    service = require('../service');

var loadFamily = function () {
    var deferred = Promise.defer();

    console.log();
    console.log('Loading family information for family ID ' + config.familyId);

    var requestData = {
        family_id: config.familyId
    };
    service.call('api/Family/Get', requestData)
        .then(function (response) {
            console.log();
            console.log('WELCOME, ' + response.family.display_name);
            deferred.resolve(response.family);
        });

    return deferred.promise;
};

module.exports = loadFamily;