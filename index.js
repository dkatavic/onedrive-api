// index.js

var api = require('./lib'),
    config = require('./config');

global.appConfig = config;

module.exports = api;
