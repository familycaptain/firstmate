// Returns promise to return express object

/*jslint node: true */
/*jslint nomen: true*/
'use strict';

var config = require('./config'),
    Promise = require('bluebird'),
    service = require('../service');

var loadItems = function (family) {
    var deferred = Promise.defer();

    console.log();
    console.log('Loading item information for ' + family.display_name);

    var requestData = {
        family_id: family.family_id
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