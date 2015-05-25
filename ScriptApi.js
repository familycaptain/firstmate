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

ScriptApi.prototype.on = function (eventName, handler) {
    this.emitter.on(eventName, handler);
};

ScriptApi.prototype.emit = function (eventName) {
    this.emitter.emit(eventName);
};

ScriptApi.prototype.debug = function (debugText) {
    console.log(debugText || '');
};

ScriptApi.prototype.atTime = function (hour, minute, second, callback) {
    //console.log("atTime");
    this.timedEvent = {
        hour: hour,
        minute: minute,
        second: second,
        callback: callback
    };
};

ScriptApi.prototype.sendNotification = function (params) {
    console.log('*************************');
    console.log(params.message);
    console.log('*************************');
};

module.exports = ScriptApi;