/*jslint node: true */
/*jslint nomen: true*/
'use strict';

// Load configuration .env file into environment variables
console.log();
require('dotenv').load();

var config = require('./config/config'),
    loadFamily = require('./config/family'),
    loadItems = require('./config/items'),
    loadPrograms = require('./config/programs'),
    _ = require('lodash');

console.log('Starting ' + config.appName + '...');

console.log();
console.log('Using web service URL: ' + config.webServiceUrl);

var familyItems,
    familyPrograms;

loadFamily()
    .then(function () {
        return loadItems();
    })
    .then(function (items) {
        familyItems = items;
    
        return loadPrograms();
    })
    .then(function (programs) {
        familyPrograms = programs;
    
        console.log();
        console.log('Running programs!');
        console.log('********************************************************');
    
        //console.log('THERE ARE ' + familyItems.length + ' items');
        //console.log(familyItems);
        
        _.forEach(familyItems, function (i) {
            
            var scripts = _.filter(familyPrograms, 'item_id', i.item_id);
            
            //console.log('TITLE: ' + i.title);
            //console.log(scripts);
            
            _.forEach(scripts, function (script) {
                eval(script.code);
            });
        });
        
        console.log();
        console.log('Done for now');
    });