/*jslint node: true */
/*jslint nomen: true*/
'use strict';

var config = require('./config/config'),
    Promise = require('bluebird'),
    request = require('request');

module.exports = {
    call: function (route, requestData) {

        var url = config.webServiceUrl + '/' + route,
            deferred = Promise.defer();

        console.log('REQUEST: ' + route + ' -> ' + JSON.stringify(requestData));

        request({
            method: 'POST',
            url: url,
            json: true,
            body: requestData
        }, function (error, response, body) {
            if (error) {
                console.error('failed:', error);
                deferred.reject();
            }
            console.log('RESPONSE: ', body);

            deferred.resolve(body);
        });

        return deferred.promise;
    }
};