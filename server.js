/*jslint node: true */
/*jslint nomen: true*/
'use strict';

// Load configuration .env file into environment variables
console.log();
require('dotenv').load();

var config = require('./config/config'),
    initApi = require('./config/api'),
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

var FM,
    family,
    familyItems,
    familyPrograms;

initApi(eventEmitter)
    .then(function (scriptApi) {
        FM = scriptApi;
    
        return loadFamily();
    })
    .then(function (f) {
        family = f;
    
        return loadItems(family);
    })
    .then(function (items) {
        familyItems = items;
    
        return loadPrograms(family, familyItems, FM);
    })
    .then(function (programs) {
        familyPrograms = programs;
        
        console.log();
        console.log('Waiting for something to happen....');
    
        var il = new InfiniteLoop;
        function tick() {            
            FM.debug();
            FM.debug('Tick ' + (new Date()).toLocaleTimeString());
            FM.emit('tick');
            
            if (FM.timedEvent) {
                var d = new Date();
                if (d.getHours() == FM.timedEvent.hour &&
                    d.getMinutes() == FM.timedEvent.minute &&
                    d.getSeconds() == FM.timedEvent.second) {
                    
                    FM.timedEvent.callback();
                    FM.timedEvent = null;
                }
            }
            
        }
        il.setInterval(1000);
        il.add(tick);
        il.run();

    });