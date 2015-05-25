// Returns promise to return express object

/*jslint node: true */
/*jslint nomen: true*/
'use strict';

var config = require('./config'),
    Promise = require('bluebird'),
    service = require('../service'),
    _ = require('lodash'),
    events = require('events');

var loadPrograms = function (family, familyItems, scriptApi) {
    var deferred = Promise.defer();

    console.log();
    console.log('Loading programs for ' + family.display_name);

    var requestData = {
        family_id: family.family_id
    };
    service.call('/Program/GetAll', requestData)
        .then(function (response) {
            console.log('  Done!');
            //console.log();
            //console.log('YOUR PROGRAMS:');
            //console.log(response.program_scripts);
        
            var familyPrograms = response.program_scripts;    
            runPrograms(familyItems, familyPrograms, scriptApi);

            deferred.resolve(familyPrograms);
        });

    return deferred.promise;
};

var runPrograms = function (familyItems, familyPrograms, scriptApi) {
    console.log();
    console.log('********************************************************');
    console.log('Running programs!');

    //console.log('THERE ARE ' + familyItems.length + ' items');
    //console.log(familyItems);

    _.forEach(familyItems, function (i) {

        var scripts = _.filter(familyPrograms, 'item_id', i.item_id);

        console.log('TITLE: ' + i.title);
        //console.log(scripts);

        _.forEach(scripts, function (script) {
            var FM = scriptApi;
            FM.currentItem = i;
            
            eval(script.code);
        });
    });    
    
    console.log('DONE.');
};

module.exports = loadPrograms;