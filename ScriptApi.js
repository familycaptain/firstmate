/*jslint node: true */
/*jslint nomen: true*/
'use strict';

var _ = require('lodash'),
    Promise = require('bluebird'),
    path = require('path'),
    fs = require('fs'),
    moment = require('moment-timezone'),
    service = require('./service');

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
    console.log("atTime h=" + hour + " m=" + minute + " s=" + second);
    
    this.timedEvent = {
        hour: hour,
        minute: minute,
        second: second,
        callback: callback
    };
};

ScriptApi.prototype.doSecondsFromNow = function (secs, callback) {
    var t = new Date(),
        h,
        m,
        s;
    
    t.setSeconds(t.getSeconds() + secs);

    h = t.getHours();
    m = t.getMinutes();
    s = t.getSeconds();
    
    this.atTime(h, m, s, callback);
};

ScriptApi.prototype.sendNotification = function (params) {
    console.log('*************************');
    console.log(params.message);
    service.call('/Notify/Send', { message: params.message });
    console.log('*************************');
};

module.exports = ScriptApi;