/*jslint node: true */
/*jslint nomen: true*/
'use strict';

// Load configuration .env file into environment variables
console.log();
require('dotenv').load();

var config = require('./config/config'),
    loadFamily = require('./config/family');

console.log('Starting ' + config.appName + '...');

console.log();
console.log('Using web service URL: ' + config.webServiceUrl);

loadFamily()
.then(function () {
    console.log('Done for now');
});
