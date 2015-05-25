// Returns promise to return express object

/*jslint node: true */
/*jslint nomen: true*/
'use strict';

var config = require('./config'),
    Promise = require('bluebird'),
    service = require('../service');

var loadItems = function () {
    var deferred = Promise.defer();

    console.log();
    console.log('Loading item information for family ID ' + config.familyId);

    var requestData = {
        family_id: config.familyId
    };
    service.call('api/Item/GetAll', requestData)
        .then(function (response) {
            console.log('  Done!');
            //console.log();
            //console.log('YOUR ITEMS:');
            //console.log(response.items);
            deferred.resolve(response.items);
        });

    return deferred.promise;
};

module.exports = loadItems;