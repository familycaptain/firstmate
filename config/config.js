// Returns current app settings based on environment  

/*jslint node: true */
/*jslint nomen: true*/
'use strict';

var _ = require('lodash');

// Get environment configurations
var all = require('./env/all');
var development = require('./env/development');
var production = require('./env/production');

// Production or development?
var currentEnvironment = development;
console.log('Current environment: ' + process.env.NODE_ENV);
if (process.env.NODE_ENV === 'production') {
    currentEnvironment = production;
}

var appSettings = _.assign(all, currentEnvironment);

// Load settings from environment variables
appSettings.familyId = Number(process.env.FAMILY_ID);

module.exports = appSettings;