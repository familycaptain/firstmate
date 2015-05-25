/*jslint node: true */
/*jslint nomen: true*/
'use strict';

var _ = require('lodash'),
    Promise = require('bluebird'),
    path = require('path'),
    fs = require('fs'),
    moment = require('moment-timezone');

function ScriptApi(emitter) {
    this.emitter = emitter;
    this.timedEvent = null;
}

ScriptApi.prototype.atTime = function (hour, minute, second, callback) {
    console.log("atTime");
    this.timedEvent = {
        hour: hour,
        minute: minute,
        second: second,
        callback: callback
    };
};

ScriptApi.prototype.sendNotification = function () {
    console.log('***********NOTIFICATION HERE!**************');
};

module.exports = ScriptApi;