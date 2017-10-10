// lib/index.js

var items = require('./items');
var config = require('./config');

global.appConfig = config;

module.exports = {

  items: items

};
