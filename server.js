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
    _ = require('lodash'),
    InfiniteLoop = require('infinite-loop'),
    events = require('events'),
    eventEmitter = new events.EventEmitter();

console.log('Starting ' + config.appName + '...');

console.log();
console.log('Using web service URL: ' + config.webServiceUrl);

var family,
    familyItems,
    familyPrograms;

loadFamily()
    .then(function (f) {
        family = f;
    
        return loadItems(family);
    })
    .then(function (items) {
        familyItems = items;
    
        return loadPrograms(family, familyItems, eventEmitter);
    })
    .then(function (programs) {
        familyPrograms = programs;
        
        console.log();
        console.log('Waiting for something to happen....');
    
        var il = new InfiniteLoop;
        function wait() {
            
            console.log('Tick.');
            eventEmitter.emit('tick');
        }
        il.setInterval(1000);
        il.add(wait);
        il.run();

    });